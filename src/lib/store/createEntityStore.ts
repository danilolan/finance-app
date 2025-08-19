import { create } from 'zustand';
import type { BaseEntity, StoreState, StoreMethods } from './types';
import { storage } from './storage';

export function createEntityStore<T extends BaseEntity>(
  storageKey: string,
  initialState: T[] = []
) {
  type State = StoreState<T> & StoreMethods<T>;

  return create<State>((set, get) => {
    // Initialize store with data from localStorage
    const savedData = storage.get<T[]>(storageKey) || initialState;

    return {
      items: savedData,
      isLoading: false,
      error: null,

      add: async (item: Omit<T, keyof BaseEntity>) => {
        const newItem = {
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as T;

        // Optimistic update
        set((state) => ({
          items: [...state.items, newItem],
          isLoading: true,
          error: null
        }));

        try {
          await storage.set(storageKey, [...get().items]);
          set({ isLoading: false });
        } catch (error) {
          // Rollback on error
          set((state) => ({
            items: state.items.filter(item => item.id !== newItem.id),
            isLoading: false,
            error: error instanceof Error ? error : new Error('Failed to add item')
          }));
          throw error;
        }
      },

      update: async (id: string, item: Partial<Omit<T, keyof BaseEntity>>) => {
        const previousItems = get().items;
        
        // Optimistic update
        set((state) => ({
          items: state.items.map((existingItem) =>
            existingItem.id === id
              ? {
                  ...existingItem,
                  ...item,
                  updatedAt: new Date().toISOString(),
                }
              : existingItem
          ),
          isLoading: true,
          error: null
        }));

        try {
          await storage.set(storageKey, get().items);
          set({ isLoading: false });
        } catch (error) {
          // Rollback on error
          set({
            items: previousItems,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Failed to update item')
          });
          throw error;
        }
      },

      remove: async (id: string) => {
        const previousItems = get().items;
        
        // Optimistic update
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          isLoading: true,
          error: null
        }));

        try {
          await storage.set(storageKey, get().items);
          set({ isLoading: false });
        } catch (error) {
          // Rollback on error
          set({
            items: previousItems,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Failed to remove item')
          });
          throw error;
        }
      },

      getAll: () => get().items,

      getById: (id: string) => get().items.find((item) => item.id === id),
    };
  });
}

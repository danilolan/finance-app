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

      add: (item: Omit<T, keyof BaseEntity>) => {
        const newItem = {
          ...item,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as T;

        set((state) => {
          const newItems = [...state.items, newItem];
          storage.set(storageKey, newItems);
          return { items: newItems };
        });
      },

      update: (id: string, item: Partial<Omit<T, keyof BaseEntity>>) => {
        set((state) => {
          const newItems = state.items.map((existingItem) =>
            existingItem.id === id
              ? {
                  ...existingItem,
                  ...item,
                  updatedAt: new Date().toISOString(),
                }
              : existingItem
          );
          storage.set(storageKey, newItems);
          return { items: newItems };
        });
      },

      remove: (id: string) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          storage.set(storageKey, newItems);
          return { items: newItems };
        });
      },

      getAll: () => get().items,

      getById: (id: string) => get().items.find((item) => item.id === id),
    };
  });
}

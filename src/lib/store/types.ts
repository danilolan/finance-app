export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreMethods<T extends BaseEntity> {
  add: (item: Omit<T, keyof BaseEntity>) => Promise<void>;
  update: (id: string, item: Partial<Omit<T, keyof BaseEntity>>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getAll: () => T[];
  getById: (id: string) => T | undefined;
}

export interface StoreState<T extends BaseEntity> {
  items: T[];
  isLoading: boolean;
  error: Error | null;
}

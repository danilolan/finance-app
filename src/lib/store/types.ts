export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreMethods<T extends BaseEntity> {
  add: (item: Omit<T, keyof BaseEntity>) => void;
  update: (id: string, item: Partial<Omit<T, keyof BaseEntity>>) => void;
  remove: (id: string) => void;
  getAll: () => T[];
  getById: (id: string) => T | undefined;
}

export interface StoreState<T extends BaseEntity> {
  items: T[];
  isLoading: boolean;
  error: string | null;
}

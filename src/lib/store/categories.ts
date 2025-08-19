import type { BaseEntity } from './types';
import { createEntityStore } from './createEntityStore';

export interface Category extends BaseEntity {
  name: string;
}

export const useCategoryStore = createEntityStore<Category>('categories', []);

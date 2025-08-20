import type { BaseEntity } from '../types';
import { createEntityStore } from '../createEntityStore';
import { colors, type ColorOption } from '@/lib/constants/colors';

export interface Category extends BaseEntity {
  name: string;
  color: ColorOption['id'];
}

function getRandomColor(): ColorOption['id'] {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex].id;
}

export const useCategoryStore = createEntityStore<Category>('categories', [], {
  beforeAdd: (item) => ({
    ...item,
    color: item.color || getRandomColor()
  })
});

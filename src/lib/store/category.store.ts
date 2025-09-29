import { create } from 'zustand';
import { categoryService } from '../api/services/category.service';
import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../api/dtos/category.dto';

interface CategoryState {
  categories: CategoryDto[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: CategoryDto | null;
  
  // Actions
  fetchCategories: () => Promise<void>;
  createCategory: (data: CreateCategoryDto) => Promise<void>;
  updateCategory: (id: string, data: UpdateCategoryDto) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  setSelectedCategory: (category: CategoryDto | null) => void;
  clearError: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null,

  fetchCategories: async () => {
    try {
      set({ isLoading: true, error: null });
      const categories = await categoryService.getAll();
      set({ categories });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch categories' });
    } finally {
      set({ isLoading: false });
    }
  },

  createCategory: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const newCategory = await categoryService.create(data);
      set(state => ({
        categories: [...state.categories, newCategory],
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to create category' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateCategory: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const updatedCategory = await categoryService.update(id, data);
      set(state => ({
        categories: state.categories.map(cat => 
          cat.id === id ? updatedCategory : cat
        ),
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to update category' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCategory: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await categoryService.delete(id);
      set(state => ({
        categories: state.categories.filter(cat => cat.id !== id),
        selectedCategory: state.selectedCategory?.id === id ? null : state.selectedCategory,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to delete category' });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearError: () => set({ error: null }),
}));
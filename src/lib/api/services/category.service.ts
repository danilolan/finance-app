import { api } from '../axios-instance';
import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

export const categoryService = {
  async getAll(): Promise<CategoryDto[]> {
    const response = await api.get<CategoryDto[]>('/categories');
    return response.data;
  },

  async getById(id: string): Promise<CategoryDto> {
    const response = await api.get<CategoryDto>(`/categories/${id}`);
    return response.data;
  },

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    const response = await api.post<CategoryDto>('/categories', data);
    return response.data;
  },

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryDto> {
    const response = await api.patch<CategoryDto>(`/categories/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
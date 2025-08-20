import { api } from '../api/axios-instance';
import type { BaseEntity, BaseResponse, PaginatedResponse } from '../types/base';

export function createBaseService<T extends BaseEntity>(path: string) {
  return {
    async getAll(params?: Record<string, any>): Promise<PaginatedResponse<T>> {
      const { data } = await api.get<PaginatedResponse<T>>(path, { params });
      return data;
    },

    async getById(id: string): Promise<BaseResponse<T>> {
      const { data } = await api.get<BaseResponse<T>>(`${path}/${id}`);
      return data;
    },

    async create(payload: Partial<T>): Promise<BaseResponse<T>> {
      const { data } = await api.post<BaseResponse<T>>(path, payload);
      return data;
    },

    async update(id: string, payload: Partial<T>): Promise<BaseResponse<T>> {
      const { data } = await api.patch<BaseResponse<T>>(`${path}/${id}`, payload);
      return data;
    },

    async delete(id: string): Promise<BaseResponse<void>> {
      const { data } = await api.delete<BaseResponse<void>>(`${path}/${id}`);
      return data;
    },
  };
}
import { api } from '../api/axios-instance';
import type { LoginFormData, LoginResponse, RegisterFormData, User } from '../types/auth';
import type { BaseResponse } from '../types/base';
import { createBaseService } from './base.service';

const baseService = createBaseService<User>('/users');

export const authService = {
  ...baseService,
  
  async login(data: LoginFormData): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterFormData): Promise<BaseResponse<User>> {
    const response = await api.post<BaseResponse<User>>('/auth/register', data);
    return response.data;
  },

  async me(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
};
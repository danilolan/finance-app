import { api } from '../axios-instance';
import type { LoginRequestDto, RegisterRequestDto } from '../dtos/auth/request';
import type { AuthResponseDto, LoginResponseDto } from '../dtos/auth/response';
import type { UserDto } from '../dtos/user';

export const authService = {
  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await api.post<LoginResponseDto>('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterRequestDto): Promise<AuthResponseDto> {
    const response = await api.post<AuthResponseDto>('/auth/register', data);
    return response.data;
  },

  async me(): Promise<UserDto> {
    const response = await api.get<UserDto>('/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
};

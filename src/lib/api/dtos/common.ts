export interface PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponseDto<T> {
  message?: string;
  data: T;
}

export interface ApiErrorDto {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

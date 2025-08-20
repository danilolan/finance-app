export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

export interface BaseError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface CategoryDto {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  user_id: string;
}

export interface CreateCategoryDto {
  name: string;
  color: string;
}

export interface UpdateCategoryDto {
  name?: string;
  color?: string;
}
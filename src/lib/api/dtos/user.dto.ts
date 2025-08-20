export interface UserDto {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
}

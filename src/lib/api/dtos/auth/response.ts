import type { UserDto } from "../../dtos/user.dto";

export interface LoginResponseDto {
  access_token: string;
  user: UserDto;
}

export interface AuthResponseDto {
  message: string;
  data: UserDto;
}

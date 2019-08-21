import { IsString, IsNotEmpty, IsEmail, Min, Max } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined = undefined;

  @IsEmail()
  @IsNotEmpty()
  email: string | undefined = undefined;

  @IsString()
  @IsNotEmpty()
  password: string | undefined = undefined;

  @IsString()
  phone: string | undefined = undefined;
}

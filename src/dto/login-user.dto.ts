import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @IsStrongPassword()
  password!: string;
}

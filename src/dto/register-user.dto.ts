import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @IsStrongPassword()
  password!: string;
}

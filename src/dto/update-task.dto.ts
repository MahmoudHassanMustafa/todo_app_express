import {
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsBoolean,
} from "class-validator";

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsEmail()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isComplete?: boolean;

  @IsDate()
  @IsOptional()
  dueDate?: Date;
}

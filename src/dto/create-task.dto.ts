import { IsString, IsOptional, IsDate, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}

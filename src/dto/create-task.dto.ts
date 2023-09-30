import { IsString, IsOptional, IsDate, IsNotEmpty } from "class-validator";
import { IsFutureDate } from "../decorators/future-date.decorator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  @IsFutureDate()
  dueDate?: Date;
}

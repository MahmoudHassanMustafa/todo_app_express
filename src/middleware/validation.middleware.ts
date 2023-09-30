import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T>(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body, {
      enableImplicitConversion: true,
    });
    const errors = await validate(dto);

    if (errors.length > 0) {
      const validationErrors: { [field: string]: string } = {};

      errors.forEach((error: ValidationError) => {
        const field = error.property;
        const messages = Object.values(error.constraints || {});
        validationErrors[field] = messages.join(", ");
      });

      res.status(400).json({ errors: validationErrors });
    } else {
      (req as any).dto = dto;
      next();
    }
  };
}

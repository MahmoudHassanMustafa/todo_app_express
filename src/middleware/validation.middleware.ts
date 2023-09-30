import { plainToClass, plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T>(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => ({
        field: error.property,
        message: Object.values(error.constraints || {}),
      }));

      res.status(400).json({ errors: validationErrors });
    } else {
      (req as any).dto = dto;
      next();
    }
  };
}

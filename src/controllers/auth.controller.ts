import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";
import { User } from "@prisma/client";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";

class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const requestBody: RegisterUserDto = (req as any).dto;
      const { name, email, password } = requestBody;

      const user: User = await authService.register(name, email, password);

      res.status(201).json(user);
    } catch (error: any) {
      console.error("Error in register:", error);
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requestBody: LoginUserDto = (req as any).dto;
      const { email, password } = requestBody;

      const result: { user: Partial<User>; token: string } | null =
        await authService.login(email, password);

      if (result) {
        res.status(200).json(result);
      } else {
        throw new InvalidCredentialsError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error in login:", error);
      next(error);
    }
  }
}

export default AuthController;

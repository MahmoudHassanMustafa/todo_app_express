import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { validationMiddleware } from "../middleware/validation.middleware";
import { RegisterUserDto } from "../dto/register-user.dto";
import { LoginUserDto } from "../dto/login-user.dto";

const authRouter = Router();
const authController = new AuthController();

// Register new users
authRouter.post(
  "/register",
  validationMiddleware(RegisterUserDto),
  authController.register
);

// Login users
authRouter.post(
  "/login",
  validationMiddleware(LoginUserDto),
  authController.login
);

export default authRouter;

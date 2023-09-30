"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validation_middleware_1 = require("../middleware/validation.middleware");
const register_user_dto_1 = require("../dto/register-user.dto");
const login_user_dto_1 = require("../dto/login-user.dto");
const authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.default();
// Register new users
authRouter.post("/register", (0, validation_middleware_1.validationMiddleware)(register_user_dto_1.RegisterUserDto), authController.register);
// Login users
authRouter.post("/login", (0, validation_middleware_1.validationMiddleware)(login_user_dto_1.LoginUserDto), authController.login);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map
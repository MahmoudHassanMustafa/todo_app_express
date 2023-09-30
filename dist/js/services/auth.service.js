"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_service_1 = require("./user.service");
const password_utils_1 = require("../utils/password-utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const duplicate_user_error_1 = require("../errors/duplicate-user.error");
const user_not_found_error_1 = require("../errors/user-not-found.error");
const invalid_credentials_error_1 = require("../errors/invalid-credentials.error");
class AuthService {
    async register(name, email, password) {
        try {
            // Check if the user already exists
            const existingUser = await user_service_1.userService.getUserByFilter({ email });
            if (existingUser) {
                throw new duplicate_user_error_1.DuplicateUserError("User with this email already exists");
            }
            // Create the new user
            const newUser = await user_service_1.userService.createUser(name, email, password);
            return newUser;
        }
        catch (error) {
            console.error("Error in AuthService (register):", error);
            throw error;
        }
    }
    async login(email, password) {
        try {
            // Find the user by email
            const user = await user_service_1.userService.getUserByFilter({
                email,
            });
            if (!user) {
                throw new user_not_found_error_1.UserNotFoundError("User not found");
            }
            // Compare the provided password with the stored hashed password
            const passwordMatch = await (0, password_utils_1.comparePasswords)(password, user.password);
            if (!passwordMatch) {
                throw new invalid_credentials_error_1.InvalidCredentialsError("Invalid credentials");
            }
            // Create a JWT token for the authenticated user
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error("JWT_SECRET is not defined in your environment.");
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret);
            return { user: lodash_1.default.omit(user, "password"), token };
        }
        catch (error) {
            console.error("Error in AuthService (login):", error);
            throw error;
        }
    }
}
const authService = new AuthService();
exports.authService = authService;
//# sourceMappingURL=auth.service.js.map
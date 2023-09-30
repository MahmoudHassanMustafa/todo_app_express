"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const password_utils_1 = require("../utils/password-utils");
const user_not_found_error_1 = require("../errors/user-not-found.error");
const duplicate_user_error_1 = require("../errors/duplicate-user.error");
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createUser(name, email, password) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                throw new duplicate_user_error_1.DuplicateUserError("User with this email already exists");
            }
            const hashedPassword = await (0, password_utils_1.hashPassword)(password);
            const userData = {
                name,
                email,
                password: hashedPassword,
            };
            const newUser = await this.prisma.user.create({
                data: userData,
            });
            return newUser;
        }
        catch (error) {
            console.error("Error in UserService (createUser):", error);
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                throw new duplicate_user_error_1.DuplicateUserError("User with this email already exists");
            }
            throw error;
        }
    }
    async getUserByFilter(filter) {
        try {
            const user = await this.prisma.user.findUnique({
                where: filter,
            });
            if (!user) {
                throw new user_not_found_error_1.UserNotFoundError("User not found");
            }
            return user;
        }
        catch (error) {
            console.error("Error in UserService (getUserById):", error);
            throw error;
        }
    }
    async getAllUsers() {
        try {
            const users = await this.prisma.user.findMany();
            return users;
        }
        catch (error) {
            console.error("Error in UserService (getAllUsers):", error);
            throw error;
        }
    }
    async updateUser(id, updatedUserData) {
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: updatedUserData,
            });
            return user;
        }
        catch (error) {
            console.error("Error in UserService (updateUser):", error);
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            return user;
        }
        catch (error) {
            console.error("Error in UserService (deleteUser):", error);
            throw error;
        }
    }
}
const userService = new UserService();
exports.userService = userService;
//# sourceMappingURL=user.service.js.map
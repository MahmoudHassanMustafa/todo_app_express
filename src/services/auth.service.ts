import { User } from "@prisma/client";
import { userService } from "./user.service";
import { comparePasswords } from "../utils/password-utils";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { DuplicateUserError } from "../errors/duplicate-user.error";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { InvalidCredentialsError } from "../errors/invalid-credentials.error";

class AuthService {
  async register(name: string, email: string, password: string): Promise<User> {
    try {
      // Check if the user already exists
      const existingUser: User | null = await userService.getUserByFilter({
        email,
      });

      if (existingUser) {
        throw new DuplicateUserError("User with this email already exists");
      }

      // Create the new user
      const newUser: User = await userService.createUser(name, email, password);

      return newUser;
    } catch (error) {
      console.error("Error in AuthService (register):", error);
      throw error;
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: Partial<User>; token: string } | null> {
    try {
      // Find the user by email
      const user: User | null = await userService.getUserByFilter({
        email,
      });

      if (!user) {
        throw new UserNotFoundError("User not found");
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch: boolean = await comparePasswords(
        password,
        user.password
      );

      if (!passwordMatch) {
        throw new InvalidCredentialsError("Invalid credentials");
      }

      // Create a JWT token for the authenticated user
      const jwtSecret: string | undefined = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in your environment.");
      }

      const token: string = jwt.sign({ id: user.id }, jwtSecret);

      return { user: _.omit(user, "password"), token };
    } catch (error) {
      console.error("Error in AuthService (login):", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export { authService };

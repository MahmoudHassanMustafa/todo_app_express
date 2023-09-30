import { Prisma, PrismaClient, User } from "@prisma/client";
import { hashPassword } from "../utils/password-utils";
import { UserNotFoundError } from "../errors/user-not-found.error";
import { DuplicateUserError } from "../errors/duplicate-user.error";

class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const existingUser: User | null = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new DuplicateUserError("User with this email already exists");
      }

      const hashedPassword = await hashPassword(password);

      const userData: Prisma.UserCreateInput = {
        name,
        email,
        password: hashedPassword,
      };

      const newUser: User = await this.prisma.user.create({
        data: userData,
      });

      return newUser;
    } catch (error) {
      console.error("Error in UserService (createUser):", error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new DuplicateUserError("User with this email already exists");
      }
      throw error;
    }
  }

  async getUserByFilter(
    filter: { id: string } | { email: string }
  ): Promise<User | null> {
    try {
      const user: User | null = await this.prisma.user.findUnique({
        where: filter,
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error("Error in UserService (getUserById):", error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[] | null> {
    try {
      const users: User[] | null = await this.prisma.user.findMany();

      return users;
    } catch (error) {
      console.error("Error in UserService (getAllUsers):", error);
      throw error;
    }
  }

  async updateUser(
    id: string,
    updatedUserData: Partial<User>
  ): Promise<User | null> {
    try {
      const user: User | null = await this.prisma.user.update({
        where: { id },
        data: updatedUserData,
      });

      return user;
    } catch (error) {
      console.error("Error in UserService (updateUser):", error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<User | null> {
    try {
      const user: User | null = await this.prisma.user.delete({
        where: { id },
      });

      return user;
    } catch (error) {
      console.error("Error in UserService (deleteUser):", error);
      throw error;
    }
  }
}

const userService = new UserService();

export { userService };

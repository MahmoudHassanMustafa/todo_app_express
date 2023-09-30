import { User } from "@prisma/client";
declare class UserService {
    private prisma;
    constructor();
    createUser(name: string, email: string, password: string): Promise<User>;
    getUserByFilter(filter: {
        id: string;
    } | {
        email: string;
    }): Promise<User | null>;
    getAllUsers(): Promise<User[] | null>;
    updateUser(id: string, updatedUserData: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<User | null>;
}
declare const userService: UserService;
export { userService };

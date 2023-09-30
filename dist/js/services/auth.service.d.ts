import { User } from "@prisma/client";
declare class AuthService {
    register(name: string, email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        user: Partial<User>;
        token: string;
    } | null>;
}
declare const authService: AuthService;
export { authService };

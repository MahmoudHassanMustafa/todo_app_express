import { NextFunction, Request, Response } from "express";
declare class AuthController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default AuthController;

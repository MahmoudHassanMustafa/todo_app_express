import { Request, Response, NextFunction } from "express";
export declare class ErrorHandler {
    static handle(err: Error, req: Request, res: Response, next: NextFunction): void;
}

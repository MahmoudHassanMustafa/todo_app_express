import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";
declare class TaskController {
    createTask(req: Request, res: Response, next: NextFunction, user: User | undefined): Promise<void>;
    getUserTasks(req: Request, res: Response, next: NextFunction, user: User | undefined): Promise<void>;
    updateTask(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteTask(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default TaskController;

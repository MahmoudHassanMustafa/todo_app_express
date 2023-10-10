import { validationMiddleware } from "../middleware/validation.middleware";
import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import TaskController from "../controllers/task.controller";
import { UserAttachedRequest } from "types/request";
import { User } from "@prisma/client";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

const taskRouter = Router();
const taskController = new TaskController();

// Middleware for authentication
const authenticate = passport.authenticate("jwt", { session: false });

// Create a new task (protected with JWT)
taskRouter.post(
  "/",
  [authenticate, validationMiddleware(CreateTaskDto)],
  (req: Request, res: Response, next: NextFunction): void => {
    const user: User | undefined = req.user as UserAttachedRequest["user"]; // Cast user property
    taskController.createTask(req, res, next, user);
  }
);

// Fetch tasks of the currently authenticated user (protected with JWT)
taskRouter.get(
  "/",
  authenticate,
  (req: Request, res: Response, next: NextFunction): void => {
    const user: User | undefined = req.user as UserAttachedRequest["user"]; // Cast user property
    taskController.getUserTasks(req, res, next, user);
  }
);

// Update a task by ID (protected with JWT)
taskRouter.patch(
  "/:taskId",
  [authenticate, validationMiddleware(UpdateTaskDto)],
  taskController.updateTask
);

// Delete a task by ID (protected with JWT)
taskRouter.delete(
  "/:taskId",
  [authenticate, validationMiddleware(TaskIdParamDto)],
  authenticate,
  taskController.deleteTask
);

export default taskRouter;

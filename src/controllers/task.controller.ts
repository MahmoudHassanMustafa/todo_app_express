import { NextFunction, Request, Response } from "express";
import { taskService } from "../services/task.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Task, User } from "@prisma/client";
import { UnauthorizedUserError } from "../errors/unauthorized-user.error";

class TaskController {
  // private taskService: TaskService;

  // constructor() {
  //   this.taskService = new TaskService();
  // }

  async createTask(
    req: Request,
    res: Response,
    next: NextFunction,
    user: User | undefined
  ): Promise<void> {
    try {
      const requestBody: CreateTaskDto = (req as any).dto;
      const { title, description, dueDate } = requestBody;

      const userId: string | undefined = user?.id; // Get the current user's ID from the request object
      if (!userId) {
        throw new UnauthorizedUserError("Unauthorized user");
      }

      const task: Task = await taskService.createTask(
        { title, description, dueDate },
        userId
      );
      res.status(201).json(task);
    } catch (error) {
      console.error("Error in createTask:", error);
      next(error);
    }
  }

  async getUserTasks(
    req: Request,
    res: Response,
    next: NextFunction,
    user: User | undefined
  ): Promise<void> {
    try {
      const userId: string | undefined = user?.id; // Get the current user's ID from the request object
      if (!userId) {
        throw new UnauthorizedUserError("Unauthorized user");
      }

      const tasks: Task[] = await taskService.getUserTasks(userId);
      res.json(tasks);
    } catch (error) {
      console.error("Error in getUserTasks:", error);
      next(error);
    }
  }

  async updateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = req.params.taskId;
      const requestBody: UpdateTaskDto = (req as any).body;

      const updatedTask: Task = await taskService.updateTask(
        taskId,
        requestBody
      );
      res.json(updatedTask);
    } catch (error) {
      console.error("Error in updateTask:", error);
      next(error);
    }
  }

  async deleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const taskId = req.params.taskId;
      await taskService.deleteTask(taskId);
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error in deleteTask:", error);
      next(error);
    }
  }
}

export default TaskController;

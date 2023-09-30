import { Prisma, PrismaClient, Task } from "@prisma/client";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskExistsError } from "../errors/task-exist.error";
import { CreateTaskDto } from "dto/create-task.dto";
import { InvalidTaskIdError } from "../errors/invalid-task-id.error";

const taskClient = new PrismaClient().task;

function handlePrismaError(error: any): Error {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    return new TaskExistsError("Task with the same title already exists");
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2023"
  ) {
    return new InvalidTaskIdError("Invalid task id");
  } else {
    console.error(error);
    return new Error("Error creating task");
  }
}

class TaskService {
  async createTask(
    { title, description, dueDate }: CreateTaskDto,
    userId: string
  ): Promise<Task> {
    const existingTask = await taskClient.findUnique({
      where: { title: title },
    });
    if (existingTask) {
      throw new TaskExistsError("Task with the same title already exists");
    }

    const taskData: Prisma.TaskCreateInput = {
      title,
      description,
      dueDate,
      owner: { connect: { id: userId } },
    };

    try {
      const task: Task = await taskClient.create({ data: taskData });
      return task;
    } catch (error) {
      handlePrismaError(error);
      throw error;
    }
  }

  async getUserTasks(userId: string): Promise<Task[]> {
    try {
      const tasks: Task[] = await taskClient.findMany({
        where: { userId: userId },
      });
      return tasks;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async updateTask(taskId: string, updateData: UpdateTaskDto): Promise<Task> {
    const { title, description, isComplete, dueDate } = updateData;

    const taskData: Prisma.TaskUpdateInput = {
      title,
      description,
      isComplete,
      dueDate,
    };

    try {
      const updatedTask: Task = await taskClient.update({
        where: { id: taskId },
        data: taskData,
      });
      return updatedTask;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await taskClient.delete({
        where: { id: taskId },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}

const taskService = new TaskService();

export { taskService };

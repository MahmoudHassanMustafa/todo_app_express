import { Task } from "@prisma/client";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { CreateTaskDto } from "dto/create-task.dto";
declare class TaskService {
    createTask({ title, description, dueDate }: CreateTaskDto, userId: string): Promise<Task>;
    getUserTasks(userId: string): Promise<Task[]>;
    updateTask(taskId: string, updateData: UpdateTaskDto): Promise<Task>;
    deleteTask(taskId: string): Promise<void>;
}
declare const taskService: TaskService;
export { taskService };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
const client_1 = require("@prisma/client");
const task_exist_error_1 = require("../errors/task-exist.error");
const invalid_task_id_error_1 = require("../errors/invalid-task-id.error");
const taskClient = new client_1.PrismaClient().task;
function handlePrismaError(error) {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002") {
        return new task_exist_error_1.TaskExistsError("Task with the same title already exists");
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
        error.code === "P2023") {
        return new invalid_task_id_error_1.InvalidTaskIdError("Invalid task id");
    }
    else {
        console.error(error);
        return new Error("Error creating task");
    }
}
class TaskService {
    async createTask({ title, description, dueDate }, userId) {
        const existingTask = await taskClient.findUnique({
            where: { title: title },
        });
        if (existingTask) {
            throw new task_exist_error_1.TaskExistsError("Task with the same title already exists");
        }
        const taskData = {
            title,
            description,
            dueDate,
            owner: { connect: { id: userId } },
        };
        try {
            const task = await taskClient.create({ data: taskData });
            return task;
        }
        catch (error) {
            handlePrismaError(error);
            throw error;
        }
    }
    async getUserTasks(userId) {
        try {
            const tasks = await taskClient.findMany({
                where: { userId: userId },
            });
            return tasks;
        }
        catch (error) {
            throw handlePrismaError(error);
        }
    }
    async updateTask(taskId, updateData) {
        const { title, description, isComplete, dueDate } = updateData;
        const taskData = {
            title,
            description,
            isComplete,
            dueDate,
        };
        try {
            const updatedTask = await taskClient.update({
                where: { id: taskId },
                data: taskData,
            });
            return updatedTask;
        }
        catch (error) {
            throw handlePrismaError(error);
        }
    }
    async deleteTask(taskId) {
        try {
            await taskClient.delete({
                where: { id: taskId },
            });
        }
        catch (error) {
            throw handlePrismaError(error);
        }
    }
}
const taskService = new TaskService();
exports.taskService = taskService;
//# sourceMappingURL=task.service.js.map
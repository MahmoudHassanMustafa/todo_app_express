"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const unauthorized_user_error_1 = require("../errors/unauthorized-user.error");
class TaskController {
    // private taskService: TaskService;
    // constructor() {
    //   this.taskService = new TaskService();
    // }
    async createTask(req, res, next, user) {
        try {
            const requestBody = req.dto;
            const { title, description, dueDate } = requestBody;
            const userId = user === null || user === void 0 ? void 0 : user.id; // Get the current user's ID from the request object
            if (!userId) {
                throw new unauthorized_user_error_1.UnauthorizedUserError("Unauthorized user");
            }
            const task = await task_service_1.taskService.createTask({ title, description, dueDate }, userId);
            res.status(201).json(task);
        }
        catch (error) {
            console.error("Error in createTask:", error);
            next(error);
        }
    }
    async getUserTasks(req, res, next, user) {
        try {
            const userId = user === null || user === void 0 ? void 0 : user.id; // Get the current user's ID from the request object
            if (!userId) {
                throw new unauthorized_user_error_1.UnauthorizedUserError("Unauthorized user");
            }
            const tasks = await task_service_1.taskService.getUserTasks(userId);
            res.json(tasks);
        }
        catch (error) {
            console.error("Error in getUserTasks:", error);
            next(error);
        }
    }
    async updateTask(req, res, next) {
        try {
            const taskId = req.params.taskId;
            const requestBody = req.body;
            const updatedTask = await task_service_1.taskService.updateTask(taskId, requestBody);
            res.json(updatedTask);
        }
        catch (error) {
            console.error("Error in updateTask:", error);
            next(error);
        }
    }
    async deleteTask(req, res, next) {
        try {
            const taskId = req.params.taskId;
            await task_service_1.taskService.deleteTask(taskId);
            res.json({ message: "Task deleted successfully" });
        }
        catch (error) {
            console.error("Error in deleteTask:", error);
            next(error);
        }
    }
}
exports.default = TaskController;
//# sourceMappingURL=task.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = require("../middleware/validation.middleware");
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const create_task_dto_1 = require("../dto/create-task.dto");
const update_task_dto_1 = require("../dto/update-task.dto");
const taskRouter = (0, express_1.Router)();
const taskController = new task_controller_1.default();
// Middleware for authentication
const authenticate = passport_1.default.authenticate("jwt", { session: false });
// Create a new task (protected with JWT)
taskRouter.post("/", [(0, validation_middleware_1.validationMiddleware)(create_task_dto_1.CreateTaskDto), authenticate], (req, res, next) => {
    const user = req.user; // Cast user property
    taskController.createTask(req, res, next, user);
});
// Fetch tasks of the currently authenticated user (protected with JWT)
taskRouter.get("/", authenticate, (req, res, next) => {
    const user = req.user; // Cast user property
    taskController.getUserTasks(req, res, next, user);
});
// Update a task by ID (protected with JWT)
taskRouter.patch("/:taskId", [(0, validation_middleware_1.validationMiddleware)(update_task_dto_1.UpdateTaskDto), authenticate], taskController.updateTask);
// Delete a task by ID (protected with JWT)
taskRouter.delete("/:taskId", 
// [validationMiddleware(TaskIdParamDto), authenticate],
authenticate, taskController.deleteTask);
exports.default = taskRouter;
//# sourceMappingURL=task.routes.js.map
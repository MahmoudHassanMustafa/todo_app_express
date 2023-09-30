"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskExistsError = void 0;
const base_custom_error_1 = require("./base-custom-error");
class TaskExistsError extends base_custom_error_1.BaseCustomError {
    constructor(message) {
        super(message, 400);
        this.name = "TaskExistsError";
    }
}
exports.TaskExistsError = TaskExistsError;
//# sourceMappingURL=task-exist.error.js.map
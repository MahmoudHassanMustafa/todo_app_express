"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTaskIdError = void 0;
const base_custom_error_1 = require("./base-custom-error");
class InvalidTaskIdError extends base_custom_error_1.BaseCustomError {
    constructor(message) {
        super(message, 400);
        this.name = "InvalidTaskIdError";
    }
}
exports.InvalidTaskIdError = InvalidTaskIdError;
//# sourceMappingURL=invalid-task-id.error.js.map
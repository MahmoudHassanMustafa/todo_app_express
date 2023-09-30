"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
const base_custom_error_1 = require("./base-custom-error");
class UserNotFoundError extends base_custom_error_1.BaseCustomError {
    constructor(message) {
        super(message, 400);
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=user-not-found.error.js.map
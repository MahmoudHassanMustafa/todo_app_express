"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateUserError = void 0;
const base_custom_error_1 = require("./base-custom-error");
class DuplicateUserError extends base_custom_error_1.BaseCustomError {
    constructor(message) {
        super(message, 400);
        this.name = "DuplicateUserError";
    }
}
exports.DuplicateUserError = DuplicateUserError;
//# sourceMappingURL=duplicate-user.error.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
const base_custom_error_1 = require("./base-custom-error");
class InvalidCredentialsError extends base_custom_error_1.BaseCustomError {
    constructor(message) {
        super(message, 400);
        this.name = "InvalidCredentialsError";
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
//# sourceMappingURL=invalid-credentials.error.js.map
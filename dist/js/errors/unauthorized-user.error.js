"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedUserError = void 0;
const base_custom_error_1 = require("./base-custom-error");
class UnauthorizedUserError extends base_custom_error_1.BaseCustomError {
    constructor(message) {
        super(message, 401);
        this.name = "UnauthorizedUserError";
    }
}
exports.UnauthorizedUserError = UnauthorizedUserError;
//# sourceMappingURL=unauthorized-user.error.js.map
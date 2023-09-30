"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCustomError = void 0;
class BaseCustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.BaseCustomError = BaseCustomError;
//# sourceMappingURL=base-custom-error.js.map
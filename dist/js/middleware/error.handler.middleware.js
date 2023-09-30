"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const base_custom_error_1 = require("../errors/base-custom-error");
class ErrorHandler {
    static handle(err, req, res, next) {
        if (err instanceof base_custom_error_1.BaseCustomError) {
            console.log("Error happened:", err.message);
            res.status(err.statusCode).json({ error: err.message });
        }
        else {
            console.error("Internal server error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error.handler.middleware.js.map
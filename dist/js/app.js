"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const passport_1 = __importDefault(require("passport"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const error_handler_middleware_1 = require("./middleware/error.handler.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
passport_1.default.use("jwt", auth_middleware_1.jwtStrategy);
app.use(passport_1.default.initialize());
app.use("/auth", auth_routes_1.default);
app.use("/tasks", task_routes_1.default);
app.use(error_handler_middleware_1.ErrorHandler.handle);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
process.on("exit", (code) => {
    console.log(`Application is exiting with code ${code}`);
});
//# sourceMappingURL=app.js.map
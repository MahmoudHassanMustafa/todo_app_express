"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res, next) {
        try {
            const requestBody = req.dto;
            const { name, email, password } = requestBody;
            const user = await auth_service_1.authService.register(name, email, password);
            res.json(user);
        }
        catch (error) {
            console.error("Error in register:", error);
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const requestBody = req.dto;
            const { email, password } = requestBody;
            const result = await auth_service_1.authService.login(email, password);
            if (result) {
                res.json(result);
            }
            else {
                res.status(401).json({ error: "Authentication failed" });
            }
        }
        catch (error) {
            console.error("Error in login:", error);
            next(error);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map
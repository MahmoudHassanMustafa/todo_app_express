"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function validationMiddleware(dtoClass) {
    return async (req, res, next) => {
        const dto = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        const errors = await (0, class_validator_1.validate)(dto);
        if (errors.length > 0) {
            const validationErrors = errors.map((error) => ({
                field: error.property,
                message: Object.values(error.constraints || {}),
            }));
            res.status(400).json({ errors: validationErrors });
        }
        else {
            req.dto = dto;
            next();
        }
    };
}
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map
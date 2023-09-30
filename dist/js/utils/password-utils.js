"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt_1.default.hash(password, saltRounds);
}
exports.hashPassword = hashPassword;
async function comparePasswords(password, hashedPassword) {
    return bcrypt_1.default.compare(password, hashedPassword);
}
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=password-utils.js.map
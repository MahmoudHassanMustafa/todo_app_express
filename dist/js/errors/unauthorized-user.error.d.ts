import { BaseCustomError } from "./base-custom-error";
declare class UnauthorizedUserError extends BaseCustomError {
    constructor(message: string);
}
export { UnauthorizedUserError };

import { BaseCustomError } from "./base-custom-error";
declare class DuplicateUserError extends BaseCustomError {
    constructor(message: string);
}
export { DuplicateUserError };

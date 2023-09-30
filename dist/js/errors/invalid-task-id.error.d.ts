import { BaseCustomError } from "./base-custom-error";
declare class InvalidTaskIdError extends BaseCustomError {
    constructor(message: string);
}
export { InvalidTaskIdError };

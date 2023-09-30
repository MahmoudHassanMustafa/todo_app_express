import { BaseCustomError } from "./base-custom-error";
declare class InvalidCredentialsError extends BaseCustomError {
    constructor(message: string);
}
export { InvalidCredentialsError };

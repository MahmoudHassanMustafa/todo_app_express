import { BaseCustomError } from "./base-custom-error";
declare class TaskExistsError extends BaseCustomError {
    constructor(message: string);
}
export { TaskExistsError };

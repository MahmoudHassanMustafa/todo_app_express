import { BaseCustomError } from "./base-custom-error";

class TaskExistsError extends BaseCustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "TaskExistsError";
  }
}

export { TaskExistsError };

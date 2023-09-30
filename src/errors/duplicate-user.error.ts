import { BaseCustomError } from "./base-custom-error";

class DuplicateUserError extends BaseCustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "DuplicateUserError";
  }
}

export { DuplicateUserError };

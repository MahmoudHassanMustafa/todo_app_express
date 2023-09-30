import { BaseCustomError } from "./base-custom-error";

class InvalidTaskIdError extends BaseCustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "InvalidTaskIdError";
  }
}
export { InvalidTaskIdError };

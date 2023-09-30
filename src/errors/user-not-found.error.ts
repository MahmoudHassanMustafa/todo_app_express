import { BaseCustomError } from "./base-custom-error";

export class UserNotFoundError extends BaseCustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "UserNotFoundError";
  }
}

import { BaseCustomError } from "./base-custom-error";

class InvalidCredentialsError extends BaseCustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "InvalidCredentialsError";
  }
}

export { InvalidCredentialsError };

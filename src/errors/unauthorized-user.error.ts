import { BaseCustomError } from "./base-custom-error";

class UnauthorizedUserError extends BaseCustomError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnauthorizedUserError";
  }
}

export { UnauthorizedUserError };

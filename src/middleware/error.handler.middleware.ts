import { Request, Response, NextFunction } from "express";
import { BaseCustomError } from "../errors/base-custom-error";

export class ErrorHandler {
  static handle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof BaseCustomError) {
      console.log("Error happened:", err.message);
      res.status(err.statusCode).json({ error: err.message });
    } else {
      console.error("Internal server error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import passport from "passport";
import { jwtStrategy } from "./middleware/auth.middleware";
import { ErrorHandler } from "./middleware/error.handler.middleware";

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use("jwt", jwtStrategy);

app.use(passport.initialize());

app.use("/auth", authRouter);

app.use("/tasks", taskRouter);

app.use(ErrorHandler.handle);

app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`));

process.on("exit", (code: number): void => {
  console.log(`Application is exiting with code ${code}`);
});

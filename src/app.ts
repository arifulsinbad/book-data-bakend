import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/apiErrorHandler";
import router from "./app/modules";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", router);
app.use(globalErrorHandler);
app.get("/", (red, res) => {
  res.send("Server connect success");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND",
      },
    ],
  });
  next();
});
export default app;

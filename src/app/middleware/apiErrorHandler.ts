import { ErrorRequestHandler } from "express";
import config from "../../config";

import { ZodError } from "zod";
import { IGenericErrorMessage } from "../interfaceError/error";
import handlerValidatationError from "../Errors/handalerError";
import handleZodError from "../Errors/handleZodError";
import handleCastError from "../Errors/handleCastError";
import ApiError from "../Errors/apiError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === "development" && console.log("GlobalHandlerError", error);

  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage: IGenericErrorMessage[] = [];
  // res.status(400).json({ errorApi: err })
  if (error?.name === "ValidationError") {
    const simplifiedError = handlerValidatationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error?.name === "CastError") {
    // res.status(400).json({ error })
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessage = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,

    message,

    errorMessage,
    stack: config.env !== "production" ? error?.stack : undefined,
  });

  next();
};
export default globalErrorHandler;

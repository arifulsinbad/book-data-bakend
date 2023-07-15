import { ZodError, ZodIssue } from "zod";
import { IGenericResponse } from "../interfaceError/common";
import { IGenericErrorMessage } from "../interfaceError/error";

const handleZodError = (error: ZodError): IGenericResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessage: errors,
  };
};

export default handleZodError;

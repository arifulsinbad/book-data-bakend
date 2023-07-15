import mongoose from "mongoose";
import { IGenericResponse } from "../interfaceError/common";
import { IGenericErrorMessage } from "../interfaceError/error";

const handlerValidatationError = (
  err: mongoose.Error.ValidationError
): IGenericResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMessage: errors,
  };
};
export default handlerValidatationError;

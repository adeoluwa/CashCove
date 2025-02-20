import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import HttpStatusCode from "./httpStatusCode";

import { error as logError} from "../utils/logger";

interface Exception {
  code: number;
  message: string;
}

export const Exception = function (
  this: Exception,
  code: number,
  message: string
) {
  this.code = code;
  this.message = message;
} as unknown as { new (code: number, message: string): Exception };

export const pErr = (err: Error): void => {
  if (err) {
    logError({
      message: err.message,
      params: {
        name: err.name,
        message: err.message,
      },
    });
  }
};

export const ErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  logError({ message: err.message, params: err });

  res.status(err.status || HttpStatusCode.HTTP_SERVICE_UNAVAILABLE);

  return res.send({
    status: "ERROR",
    message: err.message,
    errors: err.errors || [err.error || err],
  });
};

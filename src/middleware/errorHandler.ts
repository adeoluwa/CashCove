import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  status: string;
  details?: string;

  constructor(message: string, statusCode: number, details?: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const ERROR_MAP: Record<
  string,
  { statusCode: number; message: string }
> = {
  ValidationError: { statusCode: 400, message: "Invalid request data" },
  JsonWebTokenError: {
    statusCode: 401,
    message: "Invalid token. Authentication failed",
  },
  TokenExpiredError: {
    statusCode: 401,
    message: "Token expired. Please log in again",
  },
  SequelizeDatabaseError: {
    statusCode: 500,
    message: "A database error occured.",
  },
  UnauthorizedError: { statusCode: 401, message: "Unauthorized" },
  ForbiddenError: { statusCode: 403, message: "Forbidden" },
  NotFoundError: { statusCode: 404, message: "Not Found" },
  InternalServerError: { statusCode: 500, message: "Internal Server Error" },
};

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // let statusCode = 500;
  // let message = "Internal Server Error";
  // let details: string | undefined = undefined;
  console.error("Error:", err);

  // if (err instanceof AppError) {
  //   statusCode = err.statusCode;
  //   message = err.message;
  //   details = err.details;
  // } else if (ERROR_MAP[err.name]) {
  //   ({ statusCode, message } = ERROR_MAP[err.name]);
  //   details = err.message;
  // }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  // console.error({ status: statusCode, message, details, stack: err.stack });

  res.status(500).json({
    message: "Internal Server Error",
  });
};

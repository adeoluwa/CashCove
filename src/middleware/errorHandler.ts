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

export const ERROR_MAP: Record<string, { statusCode: number; message: string }> = {
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
};

export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details: string | undefined = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (ERROR_MAP[err.name]) {
    ({ statusCode, message } = ERROR_MAP[err.name]);
    details = err.message;
  }

  console.error({ status: statusCode, message, details, stack: err.stack });

  res.status(statusCode).json({
    status: statusCode < 500 ? "fail" : "error",
    message,
    ...(details && { details }),
  });
};

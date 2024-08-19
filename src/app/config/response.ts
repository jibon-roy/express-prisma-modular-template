import { NextFunction, Request, Response } from "express";

interface SuccessResponseOptions {
  statusCode: number;
  message: string;
  payload?: any;
}

export const errResponse = (
  res: Response,
  { statusCode = 400, message = "Internal server error" }
) => {
  return res.status(statusCode).json({ success: false, message, statusCode });
};

export const successResponse = (
  res: Response,
  options: SuccessResponseOptions
) => {
  const { statusCode = 200, message, payload = {} } = options;
  return res.status(statusCode).json({ success: true, message, payload });
};

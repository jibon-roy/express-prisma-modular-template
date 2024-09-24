import { Request, Response, NextFunction } from "express";

// Define a validation function
export const validateName = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      statusCode: 400,
      message: "Name parameter is required",
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      statusCode: 400,
      message: "Name must be a non-empty string",
    });
  }

  // Example: Validate length (e.g., min length 3 characters)
  if (name.length < 3) {
    return res.status(400).json({
      statusCode: 400,
      message: "Name must be at least 3 characters long",
    });
  }

  // If validation passes, call the next middleware
  next();
};

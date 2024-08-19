import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { errResponse, successResponse } from "../../config/response";

const prisma = new PrismaClient();

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });

    if (allUsers.length === 0) {
      throw createHttpError(404, "Users not found!");
    }
    successResponse(res, {
      statusCode: 200,
      message: `${allUsers.length} users found `,
      payload: { allUsers },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name } = req.body;
  try {
    await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return successResponse(res, {
      statusCode: 200,
      message: "user created successfull",
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return successResponse(res, {
        message: "",
        statusCode: 200,
        payload: user,
      });
    }

    return successResponse(res, {
      message: "",
      statusCode: 200,
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  //   console.log(req.body);

  // Basic validation
  if (!name) {
    return res.status(400).json({
      statusCode: 400,
      message: "Name parameter is required",
    });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    return successResponse(res, {
      message: "Users fetched successfully",
      statusCode: 200,
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};

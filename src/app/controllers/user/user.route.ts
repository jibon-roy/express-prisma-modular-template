import { Router } from "express";
import { getSingleUserById, getUsers, getUsersByName } from "./user.controller";

export const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/find/:id", getSingleUserById);
userRouter.get("/name", getUsersByName);

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { authenticateUser, createUserAccount } from "../services/authService";

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const userToken: string = await authenticateUser(email, password);

    if (userToken !== undefined) {
      res.status(200).json({ access: userToken });
    }
  }
);

//Create new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await createUserAccount(email, name, password);

  if (user !== undefined) {
    res.status(201).json(user);
  }
});

import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User } from "../models";
import { IAuthenticatedUserRequest } from "../../interfaces";

export const authenticatedMiddleware = expressAsyncHandler(
  async (req: IAuthenticatedUserRequest, res: Response, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;

        const user = await User.findById(decodedToken.userID).select(
          "-password"
        );

        if (user != null) req.user = user;

        next();
      } catch (error) {
        res.status(401);
        throw new Error(
          "Sorry you are not authorized. Token Validation Failed!"
        );
      }
    } else {
      if (!token) {
        res.status(400);
        throw new Error("Sorry, you are unauthorized to view this route!");
      }
    }
  }
);

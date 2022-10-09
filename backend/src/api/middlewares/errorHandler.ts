import { ErrorRequestHandler, Request, Response } from "express";

export const errorRequestHandler: ErrorRequestHandler = function (
  err,
  req: Request,
  res: Response,
  next
) {
  console.log(err.message);
  res.status(400).json({ message: err.message });
};

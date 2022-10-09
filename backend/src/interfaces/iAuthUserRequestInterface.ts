import { Request } from "express";
import { IUser } from "./iUser";

export interface IAuthenticatedUserRequest extends Request {
  user?: IUser;
}

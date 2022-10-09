import { ObjectId, Types } from "mongoose";

export interface IService {
  _id: Types.ObjectId;
  name: string;
  status: string;
  comment?: string;
  user: ObjectId;
}

import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { Types } from "mongoose";

const comparePassword = async (
  enteredPassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const generateJWToken = (userID: Types.ObjectId) => {
  return JWT.sign({ userID }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export { comparePassword, generateJWToken };

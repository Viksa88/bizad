import { User } from "../models";
import { comparePassword, generateJWToken } from "../utils";

export const authenticateUser = async (email: string, password: string) => {
  let foundUser = await User.findOne({ email: email });

  if (foundUser && (await comparePassword(password, foundUser.password))) {
    const jwtToken = generateJWToken(foundUser._id);
    return jwtToken;
  } else {
    const error = new Error("Account not found for given credentials");
    throw error;
  }
};

export const createUserAccount = async (
  email: string,
  name: string,
  password: string
) => {
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new Error("Already, There's an account with this email.");
  }

  const registeredUser = await User.create({
    name,
    email,
    password,
  });

  if (registeredUser !== undefined) {
    return registeredUser;
  } else {
    throw new Error(
      "Information you entered are incorrect. Please check them and try again."
    );
  }
};

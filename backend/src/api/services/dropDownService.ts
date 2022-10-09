import { DropDownService } from "../models";
import Business from "../models/business";

export const getDropDownServices = async () => {
  const dorpDownServices = await DropDownService.find({});

  if (dorpDownServices !== undefined) {
    return dorpDownServices;
  } else {
    throw new Error("Something went wrong, Please try again!");
  }
};

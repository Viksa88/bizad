import Business from "../models/business";

export const getBusinesses = async () => {
  const businesses = await Business.find({});

  if (businesses !== undefined) {
    return businesses;
  } else {
    throw new Error("Something went wrong, Please try again!");
  }
};

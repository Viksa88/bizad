import { IUser } from "../../interfaces";
import Service from "../models/service";

export const getServices = async (user: IUser) => {
  const services = await Service.find({ user: user._id });

  if (services !== undefined) {
    return services;
  } else {
    throw new Error("Something went wrong, Please try again!");
  }
};

export const getService = async (id: string, user: IUser) => {
  const service = await Service.findOne({ _id: id, user: user._id });

  if (service !== undefined) {
    return service;
  } else {
    throw new Error("Something went wrong, Please try again!");
  }
};

export const createService = async (
  serviceName: string,
  status: string,
  comment: string,
  user: IUser
) => {
  const createdService = await Service.create({
    name: serviceName,
    status,
    comment,
    user: user._id,
  });

  if (createdService !== undefined) {
    return createdService;
  } else {
    throw new Error(
      "Information you entered are incorrect. Please check them and try again."
    );
  }
};

export const updateService = async (
  serviceId: string,
  serviceName: string,
  status: string,
  comment: string,
  user: IUser
) => {
  const updatedService = await Service.findByIdAndUpdate(
    serviceId,
    {
      $set: {
        name: serviceName,
        status,
        comment,
        user: user._id,
      },
    },
    { new: true }
  );

  if (updatedService !== undefined) {
    return updatedService;
  } else {
    throw new Error(
      "Information you entered are incorrect. Please check them and try again."
    );
  }
};

export const deleteService = async (id: string) => {
  const service = await Service.findOneAndDelete({ _id: id });

  if (service !== undefined) {
    return service;
  } else {
    throw new Error("Something went wrong, Please try again!");
  }
};

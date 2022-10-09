import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { IAuthenticatedUserRequest, IService } from "../../interfaces";
import {
  createService as createServicesService,
  updateService as updateServicesService,
  getServices as getServicesService,
  getService as getServiceService,
  deleteService as deleteServicesService,
} from "../services";

export const getServices = expressAsyncHandler(
  async (req: IAuthenticatedUserRequest, res: Response): Promise<void> => {
    if (req.user?._id) {
      const services: IService[] = await getServicesService(req.user);

      if (services !== undefined) {
        res.status(200).json(services);
      }
    }
  }
);

export const getService = expressAsyncHandler(
  async (req: IAuthenticatedUserRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (req.user?._id) {
      const service: IService | null = await getServiceService(id, req.user);

      if (service !== undefined) {
        res.status(200).json(service);
      }
    }
  }
);

export const createService = expressAsyncHandler(
  async (req: IAuthenticatedUserRequest, res: Response): Promise<void> => {
    const { name, status, comment } = req.body;

    if (req.user?._id) {
      const service: IService = await createServicesService(
        name,
        status,
        comment,
        req.user
      );

      if (service !== undefined) {
        res.status(201).json(service);
      }
    }
  }
);

export const updateService = expressAsyncHandler(
  async (req: IAuthenticatedUserRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { serviceName, status, comment } = req.body;

    if (req.user?._id) {
      const service: IService | null = await updateServicesService(
        id,
        serviceName,
        status,
        comment,
        req.user
      );

      if (service !== undefined) {
        res.status(201).json(service);
      }
    }
  }
);

export const deleteService = expressAsyncHandler(
  async (req: IAuthenticatedUserRequest, res: Response): Promise<void> => {
    const { id } = req.params;

    if (req.user?._id) {
      const service: IService | null = await deleteServicesService(id);

      if (service !== undefined) {
        res.status(204).json(service);
      }
    }
  }
);

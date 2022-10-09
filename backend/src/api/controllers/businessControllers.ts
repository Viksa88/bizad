import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { IBusiness } from "../../interfaces";
import { getBusinesses as getBusinessesService } from "../services";

export const getBusinesses = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const businesses: IBusiness[] = await getBusinessesService();

    if (businesses !== undefined) {
      res.status(200).json(businesses);
    }
  }
);

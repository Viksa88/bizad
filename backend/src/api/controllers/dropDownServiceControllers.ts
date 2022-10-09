import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

import { IDropDownService } from "../../interfaces";
import { getDropDownServices as getDropDownServicesService } from "../services/dropDownService";

export const getDropDownServices = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const dropdownServices: IDropDownService[] =
      await getDropDownServicesService();

    if (dropdownServices !== undefined) {
      res.status(200).json(dropdownServices);
    }
  }
);

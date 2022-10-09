import { IDropDownService } from "../../interfaces";

import mongoose from "mongoose";

const dropDownServiceSchema = new mongoose.Schema<IDropDownService>({
  name: {
    type: String,
    required: true,
  },
});

const DropDownService = mongoose.model<IDropDownService>(
  "DropDownService",
  dropDownServiceSchema
);

export default DropDownService;

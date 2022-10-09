import mongoose from "mongoose";
import { IService } from "../../interfaces";

const serviceSchema = new mongoose.Schema<IService>({
  name: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  comment: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;

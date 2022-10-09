import mongoose from "mongoose";
import { IBusiness } from "../../interfaces";

const businessSchema = new mongoose.Schema<IBusiness>({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  url: {
    type: String,
    required: true,
  },
});

const Business = mongoose.model<IBusiness>("Business", businessSchema);

export default Business;

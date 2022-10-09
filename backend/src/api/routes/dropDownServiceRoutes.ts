import express from "express";
import { getDropDownServices } from "../controllers";

const router = express.Router();

router.route("/").get(getDropDownServices);

export default router;

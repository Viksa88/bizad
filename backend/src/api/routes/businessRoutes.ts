import express from "express";
import { getBusinesses } from "../controllers";

const router = express.Router();

router.route("/").get(getBusinesses);

export default router;

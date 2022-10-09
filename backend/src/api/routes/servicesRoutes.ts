import express from "express";
import {
  createService,
  updateService,
  getServices,
  getService,
  deleteService,
} from "../controllers";
import { authenticatedMiddleware } from "../middlewares";

const router = express.Router();

router
  .route("/")
  .get(authenticatedMiddleware, getServices)
  .post(authenticatedMiddleware, createService);
router
  .route("/:id")
  .get(authenticatedMiddleware, getService)
  .put(authenticatedMiddleware, updateService)
  .delete(authenticatedMiddleware, deleteService);

export default router;

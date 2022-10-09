import express from "express";
import authRoutes from "./authRoutes";
import servicesRoutes from "./servicesRoutes";
import businessRoutes from "./businessRoutes";
import dropdownServicesRoutes from "./dropDownServiceRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/services", servicesRoutes);
router.use("/dropdown/services", dropdownServicesRoutes);
router.use("/business", businessRoutes);

export default router;

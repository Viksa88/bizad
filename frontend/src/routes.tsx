import React from "react";
import { Routes as AppRoutes, Route } from "react-router-dom";
import {
  About,
  Home,
  Login,
  Register,
  ServiceDetails,
  Services,
} from "./pages";
import PrivateRoutes from "./utils/routes/PrivateRoute";

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoutes />}>
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
      </Route>
    </AppRoutes>
  );
};

export default Routes;

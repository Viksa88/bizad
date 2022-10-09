import React from "react";
import { AlertProps } from "../../utils/props";

const Alert = ({ message, variant }: AlertProps) => {
  return (
    <div className={`alert ${variant} my-2`} role="alert">
      {message}
    </div>
  );
};

export default Alert;

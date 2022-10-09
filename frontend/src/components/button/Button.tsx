import React from "react";
import { ButtonProps } from "../../utils/props";

const Button = ({
  isLoading,
  title,
  onClick,
  type,
  variant,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${variant}`}
      type={type}
      disabled={disabled}
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;

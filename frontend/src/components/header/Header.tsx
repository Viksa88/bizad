import React from "react";
import { HeaderProps } from "../../utils/props";

const Header = ({ isHalfWidth, title, subtitle }: HeaderProps) => {
  return (
    <div className="bg-dark text-light py-4 text-center">
      <div className={isHalfWidth ? "w-50 mx-auto" : ""}>
        <h1 className="fw-bold"> {title}</h1>
        <p className="fs-4">{subtitle}</p>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { BadgeProps } from "../../utils/props";

const Badge = ({ variant, text }: BadgeProps) => {
  return <span className={`badge ${variant}`}>{text}</span>;
};

export default Badge;

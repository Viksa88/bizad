import React from "react";
import { InputProps } from "../../utils/props";

const Input = ({
  placeholder,
  name,
  value,
  error,
  type,
  onChange,
  additionalStyles,
  styles,
}: InputProps) => {
  return (
    <div>
      <input
        name={name}
        type={type}
        className={`form-control ${error && "is-invalid"} ${additionalStyles}`}
        id="input"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={styles}
      />

      {error && error?.length > 0 && (
        <div className="invalid-feedback">{error}</div>
      )}
    </div>
  );
};

export default Input;

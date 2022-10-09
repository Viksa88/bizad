import React from "react";
import { v4 as uuidv4 } from "uuid";
import { SelectProps } from "../../utils/props";

const Select = ({ items, onChange, selectedItem }: SelectProps) => {
  return (
    <select
      onChange={onChange}
      className="form-select"
      aria-label="Default select example"
      value={selectedItem}
    >
      <option key={uuidv4()} value={""}>
        Select
      </option>
      {items &&
        items.map((item) => (
          <option key={uuidv4()} value={item.value}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default Select;

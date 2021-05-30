import React from "react";
import classes from "./Input.Module.css";

import { v4 as uuidv4 } from "uuid";

export const Input = ({
  value = "",
  placeholder = "",
  type = "text",
  onChange = null,
}) => {
  const id = uuidv4();
  return (
    <div className={classes.wrap}>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className={classes.input}
        id={id}
      />
      <label className={classes.placeholder} htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
};

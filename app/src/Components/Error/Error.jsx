import React from "react";
import classes from "./Error.Module.css";

export const Error = ({ text }) => (
  <p className={classes.error}>{`Ошибка: ${text}`}</p>
);

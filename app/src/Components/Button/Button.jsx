import React from "react";
import classes from "./Button.Module.css";

export const Button = ({ text = "", icon = "", onClick = null }) => (
  <button className={classes.wrap} onClick={onClick}>
    <i className={`${icon} ${classes.icon}`} />
    <p className={classes.text}>{text}</p>
  </button>
);

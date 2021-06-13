import React from "react";
import classes from "./Settings.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

export const SettingsPresentation = () => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Settings</h1>
    </div>
  );
};

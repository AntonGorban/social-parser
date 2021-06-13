import React from "react";
import classes from "./Nav.Module.css";
import { NavLink } from "react-router-dom";

import resourcesIcon from "../../img/atlas-solid.svg";

export const Nav = () => {
  return (
    <div className={classes.wrap}>
      <NavLink
        to="/auth"
        className={classes.link}
        style={{ backgroundImage: `url(${resourcesIcon})` }}
      >
        Ресурсы
      </NavLink>
      <NavLink to="/home" className={classes.link}>
        home
      </NavLink>
    </div>
  );
};

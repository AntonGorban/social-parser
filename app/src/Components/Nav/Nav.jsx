import React from "react";
import classes from "./Nav.Module.css";
import { NavLink } from "react-router-dom";

import settingsIcon from "../../img/cogs-solid.svg";
import resourcesIcon from "../../img/atlas-solid.svg";
import parsingIcon from "../../img/bolt-solid.svg";
import statsIcon from "../../img/chart-line-solid.svg";

export const Nav = () => {
  return (
    <div className={classes.wrap}>
      <NavLink
        to="/settings"
        exact
        className={classes.link}
        activeClassName={classes.active}
      >
        <img src={settingsIcon} alt="" className={classes.img} />
        Настройки
      </NavLink>
      <NavLink
        to="/resources"
        exact
        className={classes.link}
        activeClassName={classes.active}
      >
        <img src={resourcesIcon} alt="" className={classes.img} />
        Ресурсы
      </NavLink>
      <NavLink
        to="/parsing"
        exact
        className={classes.link}
        activeClassName={classes.active}
      >
        <img src={parsingIcon} alt="" className={classes.img} />
        Парсинг
      </NavLink>
      <NavLink
        to="/stats"
        exact
        className={classes.link}
        activeClassName={classes.active}
      >
        <img src={statsIcon} alt="" className={classes.img} />
        Статистика
      </NavLink>
    </div>
  );
};

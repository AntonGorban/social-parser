import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <div>
      <NavLink to="/auth">auth</NavLink>
      <NavLink to="/home">home</NavLink>
    </div>
  );
};

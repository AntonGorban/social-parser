import React from "react";
import classes from "./Auth.Module.css";

export const AuthPresentation = ({
  user,
  onUpdateEmail,
  onUpdatePassword,
  setAuthTrue,
  setAuthFalse,
}) => (
  <div>
    <h2>Авторизация</h2>
    <p>{user.email}</p>
    <input
      value={user.email}
      onChange={(event) => onUpdateEmail(event.target.value)}
    />
    <input
      value={user.password}
      onChange={(event) => onUpdatePassword(event.target.value)}
    />
    <button onClick={setAuthTrue}> Auth true</button>
    <button onClick={setAuthFalse}> Auth false</button>
  </div>
);

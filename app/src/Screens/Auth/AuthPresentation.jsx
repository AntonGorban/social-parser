import React from "react";
import classes from "./Auth.Module.css";
import { useHistory } from "react-router-dom";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

export const AuthPresentation = ({
  user,
  onUpdateEmail,
  onUpdatePassword,
  setIsLoginTrue,
  setIsLoginFalse,
  registration,
  login,
}) => {
  let history = useHistory();
  if (user.auth) history.push("/resources");
  return (
    <div className={classes.wrap}>
      <h2 className={classes.title}>{user.isLogin ? "Вход" : "Регистрация"}</h2>
      <Input value={user.email} placeholder="Email" onChange={onUpdateEmail} />
      <Input
        value={user.password}
        placeholder="Password"
        onChange={onUpdatePassword}
        type="password"
      />
      <Button
        text={user.isLogin ? "Войти" : "Зарегистрироваться"}
        icon={user.isLogin ? "fas fa-sign-in-alt" : "fas fa-user-plus"}
        onClick={user.isLogin ? login : registration}
      />
      {user.isLogin ? (
        <p className={classes.change}>
          У вас нет аккаунта?{" "}
          <span className={classes.link} onClick={setIsLoginFalse}>
            Зарегистрируйтесь
          </span>
        </p>
      ) : (
        <p className={classes.change}>
          У вас уже есть аккаунт?{" "}
          <span className={classes.link} onClick={setIsLoginTrue}>
            Войдите
          </span>
        </p>
      )}
      {user.error ? <Error text={user.error} /> : null}
    </div>
  );
};

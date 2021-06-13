import React from "react";
import classes from "./Settings.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

export const SettingsPresentation = ({ tokens }) => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Настройки</h1>
      <div className={classes.token}>
        <Input value={tokens.vk} placeholder="ВКонтакте" onChange={null} />
        <Button text="сохранить" icon="fas fa-save" onClick={null} />
      </div>
      <div className={classes.token}>
        <Input value={tokens.tg} placeholder="Telegram" onChange={null} />
        <Button text="сохранить" icon="fas fa-save" onClick={null} />
      </div>
      <div className={classes.token}>
        <Input value={tokens.youtube} placeholder="YouTube" onChange={null} />
        <Button text="сохранить" icon="fas fa-save" onClick={null} />
      </div>
      <div className={classes.token}>
        <div className={classes.token__inst}>
          <Input
            value={tokens.instLogin}
            placeholder="Instagram логин"
            onChange={null}
          />
          <Input
            value={tokens.instPassword}
            placeholder="Instagram пароль"
            onChange={null}
          />
        </div>
        <Button text="сохранить" icon="fas fa-save" onClick={null} />
      </div>
    </div>
  );
};

import React from "react";
import classes from "./Settings.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

export const SettingsPresentation = ({
  tokens,
  setVk,
  setTg,
  setYouTube,
  setInstLogin,
  setInstPassword,
  saveVk,
  saveTg,
  saveYouTube,
  saveInst,
}) => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Настройки</h1>
      <div className={classes.token}>
        <Input value={tokens.vk} placeholder="ВКонтакте" onChange={setVk} />
        <Button text="сохранить" icon="fas fa-save" onClick={saveVk} />
      </div>
      <div className={classes.token}>
        <Input value={tokens.tg} placeholder="Telegram" onChange={setTg} />
        <Button text="сохранить" icon="fas fa-save" onClick={saveTg} />
      </div>
      <div className={classes.token}>
        <Input
          value={tokens.youTube}
          placeholder="YouTube"
          onChange={setYouTube}
        />
        <Button text="сохранить" icon="fas fa-save" onClick={saveYouTube} />
      </div>
      <div className={classes.token}>
        <div className={classes.token__inst}>
          <Input
            value={tokens.instLogin}
            placeholder="Instagram логин"
            onChange={setInstLogin}
          />
          <Input
            value={tokens.instPassword}
            placeholder="Instagram пароль"
            onChange={setInstPassword}
          />
        </div>
        <Button text="сохранить" icon="fas fa-save" onClick={saveInst} />
      </div>
    </div>
  );
};

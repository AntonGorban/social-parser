import React from "react";
import classes from "./Resources.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

export const ResourcesPresentation = ({ resources, newResource }) => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Ресурсы</h1>
      <h2>Добавить ресурс</h2>
      <div className={classes.resource}>
        <div className={classes.resource__info}>
          <Input
            value={newResource.name}
            placeholder={"Название"}
            onChange={null}
          />
          <Input
            value={newResource.url}
            placeholder={"URL-адрес"}
            onChange={null}
          />
          <Input
            value={newResource.vk}
            placeholder={"ВКонтакте"}
            onChange={null}
          />
          <Input
            value={newResource.tg}
            placeholder={"Telegram"}
            onChange={null}
          />
          <Input
            value={newResource.youTube}
            placeholder={"YouTube"}
            onChange={null}
          />
          <Input
            value={newResource.ok}
            placeholder={"Одноклассники"}
            onChange={null}
          />
          <Input
            value={newResource.inst}
            placeholder={"Instagram"}
            onChange={null}
          />
          <Input
            value={newResource.tw}
            placeholder={"Twitter"}
            onChange={null}
          />
        </div>
        <Button text="Добавить" icon="fas fa-plus" onClick={null} />
      </div>

      <h2>Ваши ресурсы</h2>
      {resources.map((resource) => (
        <div className={classes.resource} key={resource.id}>
          <div className={classes.resource__info}>
            <Input
              value={resource.name}
              placeholder={"Название"}
              onChange={null}
            />
            <Input
              value={resource.url}
              placeholder={"URL-адрес"}
              onChange={null}
            />
            <Input
              value={resource.vk}
              placeholder={"ВКонтакте"}
              onChange={null}
            />
            <Input
              value={resource.tg}
              placeholder={"Telegram"}
              onChange={null}
            />
            <Input
              value={resource.youTube}
              placeholder={"YouTube"}
              onChange={null}
            />
            <Input
              value={resource.ok}
              placeholder={"Одноклассники"}
              onChange={null}
            />
            <Input
              value={resource.inst}
              placeholder={"Instagram"}
              onChange={null}
            />
            <Input
              value={resource.tw}
              placeholder={"Twitter"}
              onChange={null}
            />
          </div>
          <Button
            text="Сохранить изменения"
            icon="fas fa-pencil-alt"
            onClick={null}
          />
        </div>
      ))}
    </div>
  );
};

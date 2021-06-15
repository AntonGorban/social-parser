import React from "react";
import classes from "./Resources.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

export const ResourcesPresentation = ({
  resources,
  newResource,
  updateNameNewResource,
  updateUrlNewResource,
  updateVkNewResource,
  updateTgNewResource,
  updateYouTubeNewResource,
  updateOkNewResource,
  updateInstNewResource,
  updateTwNewResource,
  saveNewResource,
  updateNameSavedResource,
  updateUrlSavedResource,
  updateVkSavedResource,
  updateTgSavedResource,
  updateYouTubeSavedResource,
  updateOkSavedResource,
  updateInstSavedResource,
  updateTwSavedResource,
  updateSavedResource,
}) => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Ресурсы</h1>
      <h2>Добавить ресурс</h2>
      <div className={classes.resource}>
        <div className={classes.resource__info}>
          <Input
            value={newResource.name}
            placeholder={"Название"}
            onChange={updateNameNewResource}
          />
          <Input
            value={newResource.url}
            placeholder={"URL-адрес"}
            onChange={updateUrlNewResource}
          />
          <Input
            value={newResource.vk}
            placeholder={"ВКонтакте"}
            onChange={updateVkNewResource}
          />
          <Input
            value={newResource.tg}
            placeholder={"Telegram"}
            onChange={updateTgNewResource}
          />
          <Input
            value={newResource.youTube}
            placeholder={"YouTube"}
            onChange={updateYouTubeNewResource}
          />
          <Input
            value={newResource.ok}
            placeholder={"Одноклассники"}
            onChange={updateOkNewResource}
          />
          <Input
            value={newResource.inst}
            placeholder={"Instagram"}
            onChange={updateInstNewResource}
          />
          <Input
            value={newResource.tw}
            placeholder={"Twitter"}
            onChange={updateTwNewResource}
          />
        </div>
        <Button text="Добавить" icon="fas fa-plus" onClick={saveNewResource} />
      </div>

      <h2>Ваши ресурсы</h2>
      {resources.map((resource) => (
        <div className={classes.resource} key={resource.id}>
          <div className={classes.resource__info}>
            <Input
              value={resource.name}
              placeholder={"Название"}
              onChange={(event) => updateNameSavedResource(resource.id, event)}
            />
            <Input
              value={resource.url}
              placeholder={"URL-адрес"}
              onChange={(event) => updateUrlSavedResource(resource.id, event)}
            />
            <Input
              value={resource.vk}
              placeholder={"ВКонтакте"}
              onChange={(event) => updateVkSavedResource(resource.id, event)}
            />
            <Input
              value={resource.tg}
              placeholder={"Telegram"}
              onChange={(event) => updateTgSavedResource(resource.id, event)}
            />
            <Input
              value={resource.youTube}
              placeholder={"YouTube"}
              onChange={(event) =>
                updateYouTubeSavedResource(resource.id, event)
              }
            />
            <Input
              value={resource.ok}
              placeholder={"Одноклассники"}
              onChange={(event) => updateOkSavedResource(resource.id, event)}
            />
            <Input
              value={resource.inst}
              placeholder={"Instagram"}
              onChange={(event) => updateInstSavedResource(resource.id, event)}
            />
            <Input
              value={resource.tw}
              placeholder={"Twitter"}
              onChange={(event) => updateTwSavedResource(resource.id, event)}
            />
          </div>
          <Button
            text="Сохранить изменения"
            icon="fas fa-pencil-alt"
            onClick={() => updateSavedResource(resource.id)}
          />
        </div>
      ))}
    </div>
  );
};

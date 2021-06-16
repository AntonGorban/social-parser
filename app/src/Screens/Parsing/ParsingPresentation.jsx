import React from "react";
import classes from "./Parsing.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

const Td = ({ data, info }) => (
  <td className={`${classes.col} ${!info && classes.col_none}`}>
    {info &&
      (data === null
        ? "\u2015"
        : String(data)
            .split("")
            .reverse()
            .join("")
            .match(/.{1,3}/g)
            .join(" ")
            .split("")
            .reverse()
            .join(""))}
  </td>
);

export const ParsingPresentation = ({
  resources,
  startParsing,
  saveResults,
}) => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Парсинг</h1>
      <div className={classes.buttons}>
        <Button text="Спарсить" icon="fas fa-bolt" onClick={startParsing} />
        <Button text="Сохранить" icon="fas fa-save" onClick={saveResults} />
      </div>
      <table className={classes.table}>
        <thead className={classes.header}>
          <tr className={classes.row}>
            <td className={classes.col} rowspan={3}>
              ресурс
            </td>
            <td className={classes.col} colspan={6} title="метрика">
              <i className={`${classes.icon} fa fa-chart-line`} />
            </td>
            <td className={classes.col} rowspan={3} title="ВКонтакте">
              <i className={`${classes.icon} fab fa-vk`} />
            </td>
            <td className={classes.col} rowspan={3} title="Telegram">
              <i className={`${classes.icon} fab fa-telegram-plane`} />
            </td>
            <td className={classes.col} colspan={2} title="YouTube">
              <i className={`${classes.icon} fab fa-youtube`} />
            </td>
            <td className={classes.col} rowspan={3} title="Одноклассники">
              <i className={`${classes.icon} fab fa-odnoklassniki`} />
            </td>
            <td className={classes.col} rowspan={3} title="Instagram">
              <i className={`${classes.icon} fab fa-instagram`} />
            </td>
            <td className={classes.col} rowspan={3} title="Twitter">
              <i className={`${classes.icon} fab fa-twitter`} />
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={classes.col} colspan={2} title="в день">
              <i className={`${classes.icon} fas fa-calendar-day`} />
            </td>
            <td className={classes.col} colspan={2} title="в неделю">
              <i className={`${classes.icon} fas fa-calendar-week`} />
            </td>
            <td className={classes.col} colspan={2} title="в месяц">
              <i className={`${classes.icon} far fa-calendar`} />
            </td>
            <td className={classes.col} rowspan={2} title="подписчиков">
              <i className={`${classes.icon} fa fa-users`} />
            </td>
            <td className={classes.col} rowspan={2} title="просмотров">
              <i className={`${classes.icon} fa fa-eye`} />
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={classes.col} title="просмотров">
              <i className={`${classes.icon} fa fa-eye`} />
            </td>
            <td className={classes.col} title="посетителей">
              <i className={`${classes.icon} fa fa-users`} />
            </td>
            <td className={classes.col} title="просмотров">
              <i className={`${classes.icon} fa fa-eye`} />
            </td>
            <td className={classes.col} title="посетителей">
              <i className={`${classes.icon} fa fa-users`} />
            </td>
            <td className={classes.col} title="просмотров">
              <i className={`${classes.icon} fa fa-eye`} />
            </td>
            <td className={classes.col} title="посетителей">
              <i className={`${classes.icon} fa fa-users`} />
            </td>
          </tr>
        </thead>
        <tbody className={classes.body}>
          {resources.savedResources.map((resource) => (
            <tr className={classes.row}>
              <td className={`${classes.col} ${classes.col_name}`}>
                <a href={resource.info.url} target="_blank" rel="noreferrer">
                  {resource.info.name}
                </a>
              </td>
              <Td data={resource.data.dayViews} info={resource.info.url} />
              <Td data={resource.data.dayVisitors} info={resource.info.url} />
              <Td data={resource.data.weekViews} info={resource.info.url} />
              <Td data={resource.data.weekVisitors} info={resource.info.url} />
              <Td data={resource.data.monthViews} info={resource.info.url} />
              <Td data={resource.data.monthVisitors} info={resource.info.url} />
              <Td data={resource.data.vk} info={resource.info.vk} />
              <Td data={resource.data.tg} info={resource.info.tg} />
              <Td
                data={resource.data.youTubeSubscribers}
                info={resource.info.youTube}
              />
              <Td
                data={resource.data.youTubeViews}
                info={resource.info.youTube}
              />
              <Td data={resource.data.ok} info={resource.info.ok} />
              <Td data={resource.data.inst} info={resource.info.inst} />
              <Td data={resource.data.tw} info={resource.info.tw} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

import React from "react";
import classes from "./Stats.Module.css";

import { Error } from "../../Components/Error/Error";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

const Td = ({ data }) => (
  <td
    className={`${classes.col} ${
      (data === null || data === undefined) && classes.col_none
    }`}
  >
    {data !== null && data !== undefined
      ? String(data)
          .split("")
          .reverse()
          .join("")
          .match(/.{1,3}/g)
          .join(" ")
          .split("")
          .reverse()
          .join("")
      : ""}
  </td>
);

export const StatsPresentation = ({ resources }) => {
  return (
    <div className={`container ${classes.wrap}`}>
      <h1>Статистика</h1>
      {resources.map((resource) => (
        <>
          <h2>
            <a href={resource.info.url} target="_blank" rel="noreferrer">
              {resource.info.name}
            </a>
          </h2>
          <table className={classes.table}>
            <thead className={classes.header}>
              <tr className={classes.row}>
                <td className={classes.col} rowspan={3}>
                  Дата
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
              {resource.data.map((data) => (
                <tr className={classes.row}>
                  <td className={`${classes.col} ${classes.col_name}`}>
                    {`${
                      new Date(data.date).getDate() >= 10
                        ? new Date(data.date).getDate()
                        : "0" + new Date(data.date).getDate()
                    }.${
                      new Date(data.date).getMonth() >= 10
                        ? new Date(data.date).getMonth()
                        : "0" + new Date(data.date).getMonth()
                    }.${new Date(data.date).getFullYear()}`}
                  </td>
                  <Td data={data.dayViews} />
                  <Td data={data.dayVisitors} />
                  <Td data={data.weekViews} />
                  <Td data={data.weekVisitors} />
                  <Td data={data.monthViews} />
                  <Td data={data.monthVisitors} />
                  <Td data={data.vk} />
                  <Td data={data.tg} />
                  <Td data={data.youtubeSubs} />
                  <Td data={data.youtubeViews} />
                  <Td data={data.ok} />
                  <Td data={data.inst} />
                  <Td data={data.tw} />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ))}
    </div>
  );
};

import React, { useState } from "react";
import api from "../../api/api";
import { StatsPresentation } from "./StatsPresentation";

export const Stats = () => {
  const [data, setData] = useState({
    resources: [
      {
        info: {
          id: 5,
          name: "Первый Республиканский",
          url: "https://republic-tv.ru",
        },
        data: [
          {
            date: "2021-05-05T11:30:07.353Z",
            dayViews: 490,
            dayVisitors: 130,
            weekViews: 3430,
            weekVisitors: 910,
            monthViews: 14600,
            monthVisitors: 588,
            vk: 47800,
            tg: 24707609,
            youTubeSubscribers: null,
            youTubeViews: null,
            ok: null,
            inst: null,
            tw: null,
          },
          {
            date: "2021-06-10T11:30:07.353Z",
            dayViews: 480,
            dayVisitors: 127,
            weekViews: 3440,
            weekVisitors: 896,
            monthViews: 14530,
            monthVisitors: 531,
            vk: 47760,
            tg: 2470710,
            youTubeSubscribers: null,
            youTubeViews: null,
            ok: null,
            inst: null,
            tw: null,
          },
        ],
      },
      {
        info: {
          id: 6,
          name: "Народный совет",
          url: "https://dnrsovet.su",
        },
        data: [
          {
            date: "2021-05-10T11:30:07.353Z",
            dayViews: 3600,
            dayVisitors: 1980,
            weekViews: 25200,
            weekVisitors: 13300,
            monthViews: 112000,
            monthVisitors: 61300,
            vk: 12464,
            tg: 1787,
            youTubeSubscribers: 0,
            youTubeViews: 144551,
            ok: 1986,
            inst: 1144,
            tw: 3117,
          },
          {
            date: "2021-06-10T11:30:07.353Z",
            dayViews: 3580,
            dayVisitors: 1960,
            weekViews: 25170,
            weekVisitors: 13290,
            monthViews: 111870,
            monthVisitors: 61300,
            vk: 12457,
            tg: 1756,
            youTubeSubscribers: 0,
            youTubeViews: 144532,
            ok: 1973,
            inst: 1119,
            tw: 3103,
          },
        ],
      },
    ],
    recd: false,
  });

  return <StatsPresentation resources={data.resources} />;
};

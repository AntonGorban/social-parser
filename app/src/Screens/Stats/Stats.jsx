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

  const getData = async () => {
    let data = [];
    const response = await api.parse.get();
    const resources = await api.resource.get();
    data = {
      resources: resources.data.map((resource) => ({
        info: {
          id: resource.id,
          name: resource.name,
          url: resource.url,
      },
      })),
      recd: true,
    };
    data.resources.forEach((resource, id) => {
      data.resources[id].data = [
        ...response.data.map((parse) => ({
          date: parse.createdAt,
          ...parse.data.filter(
            (info) => info.resourceId === resource.info.id
          )[0],
        })),
      ];
  });
    setData(data);
    console.log(data);
  };

  if (!data.recd) getData();

  console.log("data", data);

  return <StatsPresentation resources={data.resources} />;
};

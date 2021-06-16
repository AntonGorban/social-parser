import React, { useState } from "react";
import api from "../../api/api";
import { StatsPresentation } from "./StatsPresentation";

export const Stats = () => {
  const [data, setData] = useState({
    resources: [
      {
        info: {
          id: 0,
          name: "",
          url: "",
        },
        data: [
          {
            date: "1970-01-01T11:30:07.353Z",
            dayViews: null,
            dayVisitors: null,
            weekViews: null,
            weekVisitors: null,
            monthViews: null,
            monthVisitors: null,
            vk: null,
            tg: null,
            youtubeSubs: null,
            youtubeViews: null,
            ok: null,
            inst: null,
            tw: null,
          },
        ],
      },
    ],
    recd: false,
  });

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

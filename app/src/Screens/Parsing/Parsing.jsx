import React, { useState } from "react";
import api from "../../api/api";
import { ParsingPresentation } from "./ParsingPresentation";

export const Parsing = () => {
  const [resources, setResources] = useState({
    savedResources: [
      {
        info: {
          id: 0,
          name: "",
          url: "",
          vk: "",
          tg: "",
          youTube: "",
          ok: "",
          inst: "",
          tw: "",
        },
        data: {
          dayViews: null,
          dayVisitors: null,
          weekViews: null,
          weekVisitors: null,
          monthViews: null,
          monthVisitors: null,
          vk: null,
          tg: null,
          youTubeSubscribers: null,
          youTubeViews: null,
          ok: null,
          inst: null,
          tw: null,
        },
      },
    ],
    recd: false,
  });

  const getResources = async () => {
    const response = await api.resource.get();
    setResources((prev) => ({
      ...prev,
      recd: true,
      savedResources: response.data.map((resource) => ({
        info: {
          id: resource.id,
          name: resource.name || "",
          url: resource.url || "",
          vk: resource.vk || "",
          tg: resource.tg || "",
          youTube: resource.youtube || "",
          ok: resource.ok || "",
          inst: resource.inst || "",
          tw: resource.tw || "",
        },
        data: {
          dayViews: null,
          dayVisitors: null,
          weekViews: null,
          weekVisitors: null,
          monthViews: null,
          monthVisitors: null,
          vk: null,
          tg: null,
          youTubeSubscribers: null,
          youTubeViews: null,
          ok: null,
          inst: null,
          tw: null,
        },
      })),
    }));
  };

  if (!resources.recd) getResources();

  console.log(process);

  const [tokens, setTokens] = useState({
    user: {
      vk: "",
      tg: "",
      youTube: "",
      instLogin: "",
      instPassword: "",
      recd: false,
    },
    default: {
      vk: "",
      tg: "",
      youTube: "",
      instLogin: "",
      instPassword: "",
      recd: false,
    },
  });

  const getUserTokens = async () => {
    const response = await api.token.get();
    setTokens((prev) => ({
      ...prev,
      user: {
        vk: response.data.vk,
        tg: response.data.tg,
        youTube: response.data.youtube,
        instLogin: response.data.instLogin,
        instPassword: response.data.instPassword,
        recd: true,
      },
    }));
  };

  if (!tokens.user.recd) getUserTokens();

  const getDefaultTokens = async () => {
    const response = await api.token.default();
    setTokens((prev) => ({
      ...prev,
      default: {
        vk: response.data.vk,
        tg: response.data.tg,
        youTube: response.data.youtube,
        instLogin: response.data.instLogin,
        instPassword: response.data.instPassword,
        recd: true,
      },
    }));
  };

  if (!tokens.default.recd) getDefaultTokens();

  console.log(resources.savedResources, tokens);

  const startParsing = async () => {
    for await (let resource of resources.savedResources) {
      const response = await api.parse.start(resource);
      console.log(response.data);
      setResources((prev) => ({
        ...prev,
        savedResources: prev.savedResources.map((data) => ({
          ...(data.info.id !== response.data.info.id ? data : response.data),
        })),
      }));
    }
  };

  const saveResults = async () => {
    try {
      await api.parse.create(
        resources.savedResources.map((resource) => ({
          resource: resource.info.id,
          dayViews: resource.data.dayViews,
          dayVisitors: resource.data.dayVisitors,
          weekViews: resource.data.weekViews,
          weekVisitors: resource.data.weekVisitors,
          monthViews: resource.data.monthViews,
          monthVisitors: resource.data.monthVisitors,
          vk: resource.data.vk,
          tg: resource.data.tg,
          youtubeSubs: resource.data.youTubeSubscribers,
          youtubeViews: resource.data.youTubeViews,
          ok: resource.data.ok,
          inst: resource.data.inst,
          tw: resource.data.tw,
        }))
      );
      alert("Ваши данные были сохранены!");
    } catch (error) {
      alert("Что-то пошло не так!");
      console.error(error);
    }
  };

  return (
    <ParsingPresentation
      resources={resources}
      startParsing={startParsing}
      saveResults={saveResults}
    />
  );
};

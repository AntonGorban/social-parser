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

  console.log(resources, tokens);

  return <ParsingPresentation resources={resources} />;
};

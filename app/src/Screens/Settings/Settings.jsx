import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { SettingsPresentation } from "./SettingsPresentation";

export const Settings = () => {
  const [tokens, setTokens] = useState({
    vk: "",
    tg: "",
    youtube: "",
    instLogin: "",
    instPassword: "",
    recd: false,
    error: "",
  });

  const getTokens = async () => {
    const response = await api.token.get();
    setTokens({
      vk: response.data.vk,
      tg: response.data.tg,
      youtube: response.data.youtube,
      instLogin: response.data.instLogin,
      instPassword: response.data.instPassword,
      recd: true,
      error: "",
    });
  };

  if (!tokens.recd) {
    getTokens();
  }

  console.log("tokens", tokens);
  return <SettingsPresentation />;
};

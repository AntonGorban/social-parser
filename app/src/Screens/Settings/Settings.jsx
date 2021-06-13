import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { SettingsPresentation } from "./SettingsPresentation";

export const Settings = () => {
  const [tokens, setTokens] = useState({
    vk: "",
    tg: "",
    youTube: "",
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
      youTube: response.data.youtube,
      instLogin: response.data.instLogin,
      instPassword: response.data.instPassword,
      recd: true,
      error: "",
    });
  };

  if (!tokens.recd) {
    getTokens();
  }

  const setVk = (event) =>
    setTokens((prev) => ({ ...prev, vk: event.target.value }));
  const setTg = (event) =>
    setTokens((prev) => ({ ...prev, tg: event.target.value }));
  const setYouTube = (event) =>
    setTokens((prev) => ({ ...prev, youTube: event.target.value }));
  const setInstLogin = (event) =>
    setTokens((prev) => ({ ...prev, instLogin: event.target.value }));
  const setInstPassword = (event) =>
    setTokens((prev) => ({ ...prev, instPassword: event.target.value }));

  const saveVk = async () => {
    await api.token.updateVk({ vk: tokens.vk });
    getTokens();
  };
  const saveTg = async () => {
    await api.token.updateTg({ tg: tokens.tg });
    getTokens();
  };
  const saveYouTube = async () => {
    await api.token.updateYouTube({ youtube: tokens.youTube });
    getTokens();
  };
  const saveInst = async () => {
    await api.token.updateInst({
      instLogin: tokens.instLogin,
      instPassword: tokens.instPassword,
    });
    getTokens();
  };

  console.log("tokens", tokens);
  return (
    <SettingsPresentation
      tokens={tokens}
      setVk={setVk}
      setTg={setTg}
      setYouTube={setYouTube}
      setInstLogin={setInstLogin}
      setInstPassword={setInstPassword}
      saveVk={saveVk}
      saveTg={saveTg}
      saveYouTube={saveYouTube}
      saveInst={saveInst}
    />
  );
};

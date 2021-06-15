import React, { useState } from "react";
import api from "../../api/api";
import { ParsingPresentation } from "./ParsingPresentation";

const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const easyvk = require("easyvk");
process.versions.node = "14.15.5"; // crutch for node-telegram-bot-api .\app\node_modules\node-telegram-bot-api\index.js
const tgBot = require("node-telegram-bot-api");
// const { google } = require("googleapis");
const Instagram = require("instagram-web-api");

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

  let inst = null;
  let tg = null;
  // let youTube = null;

  if (tokens.default.recd) {
    // inst = new Instagram({
    //   username: tokens.default.instLogin,
    //   password: tokens.default.instPassword,
    // });
    // inst
    //   .login({
    //     username: tokens.default.instLogin,
    //     password: tokens.default.instPassword,
    //   })
    //   .then((log) =>
    //     console.log(`Instagram authenticated: ${log.authenticated}`)
    //   )
    //   .catch((error) => console.error("Instagram login error:", error));
    // tg = new tgBot(tokens.default.tg, { polling: true });
    // youTube = google.youtube({
    //   version: "v3",
    //   auth: tokens.default.youTube,
    // });
  }

  const strToInt = (str) => Number(`${str}`.replace(/\D/g, ""));
  // const prettyNumber = str => `${str}`.split('').reverse().join('').replace(/(\d{3})/g, '$1 ').split('').reverse().join('').trim();
  // const prettyDate = date => `${new Date(date).getDate()}_${new Date(date).getMonth() + 1}_${new Date(date).getFullYear()}~${new Date(date).getHours()}-${new Date(date).getMinutes()}-${new Date(date).getSeconds()}-${new Date(date).getMilliseconds()}`;

  async function parse(url, parseFunc, key) {
    try {
      const response = await axios.get(url);
      await parseFunc(new JSDOM(response.data).window.document.body, key);
    } catch (error) {
      console.error("parse error:", error);
    }
  }

  const parseMetric = (html, key) => {
    const table = html
      .querySelector("div#trafik")
      .querySelector(".analysis-test__content")
      .querySelector("tbody").children;
    let dayViews = strToInt(table[0].children[1].innerHTML);
    let dayVisitors = strToInt(table[1].children[1].innerHTML);
    let weekViews = strToInt(table[0].children[2].innerHTML);
    let weekVisitors = strToInt(table[1].children[2].innerHTML);
    let monthViews = strToInt(table[0].children[3].innerHTML);
    let monthVisitors = strToInt(table[1].children[3].innerHTML);
    setResources((prev) => ({
      ...prev,
      savedResources: [
        ...prev.savedResources.map((resource, id) => ({
          info: resource.info,
          data: {
            ...resource.data,
            dayViews: key == id ? dayViews : resource.data.dayViews,
            dayVisitors: key == id ? dayVisitors : resource.data.dayVisitors,
            weekViews: key == id ? weekViews : resource.data.weekViews,
            weekVisitors: key == id ? weekVisitors : resource.data.weekVisitors,
            monthViews: key == id ? monthViews : resource.data.monthViews,
            monthVisitors:
              key == id ? monthVisitors : resource.data.monthVisitors,
          },
        })),
      ],
    }));
  };

  const parseTw = (html, key) => {
    const members = html.querySelector(
      ".table.table-bordered.table-condensed.dashed .col-xs-2"
    );
    let tw = strToInt(members.innerHTML);
    setResources((prev) => ({
      ...prev,
      savedResources: [
        ...prev.savedResources.map((resource, id) => ({
          info: resource.info,
          data: {
            ...resource.data,
            tw: key == id ? tw : resource.data.tw,
          },
        })),
      ],
    }));
  };

  const parseOk = (html, key) => {
    const members = html.querySelector("#groupMembersCntEl");
    let ok = strToInt(members.innerHTML);
    setResources((prev) => ({
      ...prev,
      savedResources: [
        ...prev.savedResources.map((resource, id) => ({
          info: resource.info,
          data: {
            ...resource.data,
            ok: key == id ? ok : resource.data.ok,
          },
        })),
      ],
    }));
  };

  const parseVK = (resource, key) => {
    easyvk({
      token: tokens.default.vk,
    })
      .then(async (vkApi) => {
        const response = await vkApi.call("groups.getById", {
          group_id: resource.info.vk,
          fields: "members_count",
        });
        let vk = response[0].members_count;
        setResources((prev) => ({
          ...prev,
          savedResources: [
            ...prev.savedResources.map((resource, id) => ({
              info: resource.info,
              data: {
                ...resource.data,
                vk: key == id ? vk : resource.data.vk,
              },
            })),
          ],
        }));
      })
      .catch((error) => console.error("VK error:", error));
  };

  const parseTG = (resource, key) => {
    tg.getChatMembersCount(resource.info.tg)
      .then((response) => {
        let tgData = response;
        setResources((prev) => ({
          ...prev,
          savedResources: [
            ...prev.savedResources.map((resource, id) => ({
              info: resource.info,
              data: {
                ...resource.data,
                tg: key == id ? tgData : resource.data.tg,
              },
            })),
          ],
        }));
      })
      .catch((error) => console.error("Telegram error:", error));
  };

  // const parseYouTube = (resource, data, key) => {
  //   youTube.channels
  //     .list({
  //       part: "statistics",
  //       id: resource.youTube,
  //     })
  //     .then((response) => {
  //       data.youTubeSubscribers = strToInt(
  //         response.data.items[0].statistics.subscriberCount
  //       );
  //       data.youTubeViews = strToInt(
  //         response.data.items[0].statistics.viewCount
  //       );
  //       render(key, ["youTubeSubscribers", "youTubeViews"]);
  //     })
  //     .catch((error) => console.error("YouTube error:", error));
  // };

  const parseInst = (resource, key) => {
    inst
      .getFollowers({
        userId: resource.info.inst,
      })
      .then((response) => {
        let instData = response.count;
        setResources((prev) => ({
          ...prev,
          savedResources: [
            ...prev.savedResources.map((resource, id) => ({
              info: resource.info,
              data: {
                ...resource.data,
                inst: key == id ? instData : resource.data.inst,
              },
            })),
          ],
        }));
      })
      .catch((error) => console.error("Instagram error:", error));
  };

  const settings = {
    metric: "https://a.pr-cy.ru/",
    ok: {
      before: "https://ok.ru/",
      after: "/members",
    },
    tw: "https://pr-cy.ru/social/twitter/",
  };

  const startParsing = async () => {
    for (const key in resources.savedResources) {
      try {
        if (
          resources.savedResources[key].info.url !== null &&
          (resources.savedResources[key].data.dayViews === null ||
            resources.savedResources[key].data.dayVisitors === null ||
            resources.savedResources[key].data.weekViews === null ||
            resources.savedResources[key].data.weekVisitors === null ||
            resources.savedResources[key].data.monthViews === null ||
            resources.savedResources[key].data.monthVisitors === null)
        ) {
          try {
            await parse(
              `${settings.metric}${resources.savedResources[
                key
              ].info.url.replace(/(http:\/\/|https:\/\/)/gi, "")}`,
              parseMetric,
              key
            );
          } catch (error) {
            console.log("error", error);
          }
        }

        // if (
        //   resources.setResources[key].info.vk !== null &&
        //   resources.savedResources[key].data.vk === null
        // ) {
        //   try {
        //     parseVK(resources.savedResources[key], key);
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        // }

        // if (
        //   resources.savedResources[key].info.tg !== null &&
        //   resources.savedResources[key].data.tg === null
        // ) {
        //   try {
        //     parseTG(resources.savedResources[key], key);
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        // }

        // if (resources[key].youTube !== null && (
        //     data[key].youTubeSubscribers === null ||
        //     data[key].youTubeViews === null
        //   )) parseYouTube(resources[key], data[key], key);

        if (
          resources.savedResources[key].info.ok !== null &&
          resources.savedResources[key].data.ok === null
        ) {
          try {
            parse(
              `${settings.ok.before}${resources.savedResources[key].info.ok}${settings.ok.after}`,
              parseOk,
              key
            );
          } catch (error) {
            console.log("error", error);
          }
        }

        // if (
        //   resources.savedResources[key].info.inst !== null &&
        //   resources.savedResources[key].data.inst === null
        // ) {
        //   try {
        //     parseInst(resources.savedResources[key], key);
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        // }

        if (
          resources.savedResources[key].info.tw !== null &&
          resources.savedResources[key].data.tw === null
        ) {
          try {
            await parse(
              `${settings.tw}${resources.savedResources[key].info.tw}`,
              parseTw,
              key
            );
          } catch (error) {
            console.log("error", error);
          }
        }
      } catch (error) {
        console.warn(error);
      }
      // resources.savedResources[key].data.date = Date.now();
      // console.log(`${resources.savedResources[key].name} : parsing done`);
    }
  };

  console.log(resources.savedResources, tokens);

  return (
    <ParsingPresentation resources={resources} startParsing={startParsing} />
  );
};

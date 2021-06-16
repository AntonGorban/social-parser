const ApiError = require("../error/ApiError");
const { Parse, ParseInfo } = require("../models/models");

const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const easyvk = require("easyvk");
const tgBot = require("node-telegram-bot-api");
const { google } = require("googleapis");

const tg = new tgBot(process.env.TG, {
  polling: true,
});
const youTube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE,
});
const Instagram = require("instagram-web-api");

const inst = new Instagram({
  username: process.env.INST_LOGIN,
  password: process.env.INST_PASS,
});
inst
  .login({
    username: process.env.INST_LOGIN,
    password: process.env.INST_PASS,
  })
  .then((log) => console.log(`Instagram authenticated: ${log.authenticated}`))
  .catch((error) => console.error("Instagram login error:", error));

class ParseController {
  async getAllByUserId(req, res, next) {
    const parse = await Parse.findAll({
      where: { userId: req.user.id },
      include: [{ model: ParseInfo, as: "data" }],
    });
    if (!parse) {
      return next(ApiError.notFound("Данные не найдены"));
    }
    return res.status(200).json(parse);
  }

  async getOneById(req, res, next) {
    const parse = await Parse.findOne({
      where: { id: req.params.id },
      include: [{ model: ParseInfo, as: "data" }],
    });
    if (!parse) {
      return next(ApiError.notFound("Данные не найдены"));
    }
    if (parse.userId === req.params.id) {
      return next(ApiError.forbidden("У вас нет доступа к этим данным"));
    }
    return res.status(200).json(parse);
  }

  async create(req, res, next) {
    const data = req.body;
    if (data.length < 1) {
      return next(ApiError.badRequest("Нет данных"));
    }
    const parse = await Parse.create({ userId: req.user.id });
    data.map((field) => {
      ParseInfo.create({
        parseId: parse.id,
        resourceId: field.resource,
        dayViews: field.dayViews || null,
        dayVisitors: field.dayVisitors || null,
        weekViews: field.weekViews || null,
        weekVisitors: field.weekVisitors || null,
        monthViews: field.monthViews || null,
        monthVisitors: field.monthVisitors || null,
        vk: field.vk || null,
        tg: field.tg || null,
        youtubeSubs: field.youtubeSubs || null,
        youtubeViews: field.youtubeViews || null,
        ok: field.ok || null,
        inst: field.inst || null,
        tw: field.tw || null,
      });
    });
    res.status(201).json({ parseId: parse.id });
  }

  async start(req, res, next) {
    const resource = req.body;

    const strToInt = (str) => Number(`${str}`.replace(/\D/g, ""));

    const parse = async (url, parseFunc, data) => {
      try {
        const response = await axios.get(url);
        await parseFunc(new JSDOM(response.data).window.document.body, data);
        // console.log(new JSDOM(response.data).window.document.body);
      } catch (error) {
        console.error("parse error:", error);
      }
    };

    const parseMetric = (html, data) => {
      const table = html
        .querySelector("div#trafik")
        .querySelector(".analysis-test__content")
        .querySelector("tbody").children;
      data.dayViews = strToInt(table[0].children[1].innerHTML);
      data.dayVisitors = strToInt(table[1].children[1].innerHTML);
      data.weekViews = strToInt(table[0].children[2].innerHTML);
      data.weekVisitors = strToInt(table[1].children[2].innerHTML);
      data.monthViews = strToInt(table[0].children[3].innerHTML);
      data.monthVisitors = strToInt(table[1].children[3].innerHTML);
    };

    const parseTw = (html, data) => {
      const members = html.querySelector(
        ".table.table-bordered.table-condensed.dashed .col-xs-2"
      );
      data.tw = strToInt(members.innerHTML);
    };

    const parseOk = (html, data) => {
      const members = html.querySelector("#groupMembersCntEl");
      data.ok = strToInt(members.innerHTML);
    };

    const parseVK = async (resource, data) => {
      await easyvk({
        token: process.env.VK,
      })
        .then(async (vk) => {
          const response = await vk.call("groups.getById", {
            group_id: resource.vk,
            fields: "members_count",
          });
          data.vk = response[0].members_count;
        })
        .catch((error) => console.error("VK error:", error));
    };

    const parseTG = async (resource, data) => {
      await tg
        .getChatMembersCount(resource.tg)
        .then((response) => {
          data.tg = response;
        })
        .catch((error) => console.error("Telegram error:", error));
    };

    const parseYouTube = async (resource, data) => {
      await youTube.channels
        .list({
          part: "statistics",
          id: resource.youTube,
        })
        .then((response) => {
          data.youTubeSubscribers = strToInt(
            response.data.items[0].statistics.subscriberCount
          );
          data.youTubeViews = strToInt(
            response.data.items[0].statistics.viewCount
          );
        })
        .catch((error) => console.error("YouTube error:", error));
    };

    const parseInst = async (resource, data) => {
      await inst
        .getFollowers({
          userId: resource.inst,
        })
        .then((response) => {
          data.inst = response.count;
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
      await parse(
        `${settings.metric}${resource.info.url.replace(
          /(http:\/\/|https:\/\/)/gi,
          ""
        )}`,
        parseMetric,
        resource.data
      );
      await parseVK(resource.info, resource.data);
      await parseTG(resource.info, resource.data);
      await parseYouTube(resource.info, resource.data);
      await parse(
        `${settings.ok.before}${resource.info.ok}${settings.ok.after}`,
        parseOk,
        resource.data
      );
      await parseInst(resource.info, resource.data);
      await parse(`${settings.tw}${resource.info.tw}`, parseTw, resource.data);
    };

    await startParsing();

    res.status(200).json(resource);
  }
}

module.exports = new ParseController();

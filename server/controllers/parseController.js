const ApiError = require("../error/ApiError");
const { Parse, ParseInfo } = require("../models/models");

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
}

module.exports = new ParseController();

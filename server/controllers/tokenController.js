const ApiError = require("../error/ApiError");
const { Users, Tokens } = require("../models/models");

const excerpt = (tokens) => ({
  vk: tokens.vk,
  tg: tokens.tg,
  youtube: tokens.youtube,
  instLogin: tokens.instLogin,
  instPassword: tokens.instPassword,
});

class TokenController {
  async getByUserId(req, res, next) {
    const tokens = await Tokens.findOne({ where: { userId: req.user.id } });
    return res.status(200).json(excerpt(tokens));
  }

  async getDefault(req, res, next) {
    const user = await Users.findOne({ where: { email: "DEFAULT" } });
    const tokens = await Tokens.findOne({ where: { userId: user.id } });
    return res.status(200).json(excerpt(tokens));
  }

  async setVk(req, res, next) {}

  async setTg(req, res, next) {}

  async setYoutube(req, res, next) {}

  async setInst(req, res, next) {}

  async updateVk(req, res, next) {
    const { vk } = req.body;
    try {
      await Tokens.update({ vk }, { where: { userId: req.user.id } });
      const tokens = await Tokens.findOne({ where: { userId: req.user.id } });
      return res.status(200).json(excerpt(tokens));
    } catch (error) {
      return next(ApiError.internal());
    }
  }

  async updateTg(req, res, next) {
    const { tg } = req.body;
    try {
      await Tokens.update({ tg }, { where: { userId: req.user.id } });
      const tokens = await Tokens.findOne({ where: { userId: req.user.id } });
      return res.status(200).json(excerpt(tokens));
    } catch (error) {
      return next(ApiError.internal());
    }
  }

  async updateYoutube(req, res, next) {
    const { youtube } = req.body;
    try {
      await Tokens.update({ youtube }, { where: { userId: req.user.id } });
      const tokens = await Tokens.findOne({ where: { userId: req.user.id } });
      return res.status(200).json(excerpt(tokens));
    } catch (error) {
      return next(ApiError.internal());
    }
  }

  async updateInst(req, res, next) {
    const { instLogin, instPassword } = req.body;
    try {
      await Tokens.update(
        { instLogin, instPassword },
        { where: { userId: req.user.id } }
      );
      const tokens = await Tokens.findOne({ where: { userId: req.user.id } });
      return res.status(200).json(excerpt(tokens));
    } catch (error) {
      return next(ApiError.internal());
    }
  }
}

module.exports = new TokenController();

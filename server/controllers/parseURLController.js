const ApiError = require("../error/ApiError");
const { ParseUrl } = require("../models/models");

class ParseURLController {
  async getAll(req, res, next) {
    const urls = await ParseUrl.findAll();
    const result = {};
    urls.map((url) => (result[url.name] = url.url));
    return res.status(200).json(result);
  }
}

module.exports = new ParseURLController();

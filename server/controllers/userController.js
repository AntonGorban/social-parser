class UserController {
  async login(req, res, next) {}

  async auth(req, res, next) {
    res.status(200).json({ m: "Hello controller" });
  }

  async registration(req, res, next) {}
}

module.exports = new UserController();

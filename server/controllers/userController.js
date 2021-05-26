class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async auth(req, res) {
    res.status(200).json({ m: "Hello controller" });
  }
}

module.exports = new UserController();

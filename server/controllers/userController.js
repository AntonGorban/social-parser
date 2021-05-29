const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Users, Tokens } = require("../models/models");

const generateJWT = (id, email) =>
  JWT.sign({ id, email }, process.env.JWT_KEY, {
    expiresIn: "60d",
  });
class UserController {
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }
    let comparePasswords = bcrypt.compareSync(password, user.password);
    if (!comparePasswords) {
      return next(ApiError.unauthorized("Указан неверный пароль"));
    }
    const token = generateJWT(user.id, user.email);
    return res.status(200).json({ token });
  }

  async auth(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email);
    return res.status(200).json({ token });
  }

  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }
    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("Пользователь с таким email уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await Users.create({ email, password: hashPassword });
    await Tokens.create({ userId: user.id });
    const token = generateJWT(user.id, user.email);
    return res.status(201).json({ token });
  }
}

module.exports = new UserController();

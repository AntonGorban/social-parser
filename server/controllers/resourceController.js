const ApiError = require("../error/ApiError");
const { Resources } = require("../models/models");

class ResourceController {
  async getAllByUserId(req, res, next) {
    const resources =
      (await Resources.findAll({ where: { userId: req.user.id } })) || [];
    return res.status(200).json(resources);
  }

  async getOneById(req, res, next) {
    const resource = await Resources.findOne({
      where: { id: req.params.id },
    });
    if (!resource) {
      return next(ApiError.notFound("Запрашиваемый ресурс не найден"));
    }
    if (resource.userId !== req.user.id) {
      return next(
        ApiError.forbidden("У вас нет доступа к запрашиваемому ресурсу")
      );
    }
    return res.status(200).json(resource);
  }

  async create(req, res, next) {
    const {
      name = null,
      url = null,
      vk = null,
      tg = null,
      youtube = null,
      ok = null,
      inst = null,
      tw = null,
    } = req.body;
    if (!name) {
      return next(
        ApiError.badRequest("Название ресурса должно быть заполнено")
      );
    }
    const resource = await Resources.create({
      name,
      url: url || null,
      vk: vk || null,
      tg: tg || null,
      youtube: youtube || null,
      ok: ok || null,
      inst: inst || null,
      tw: tw || null,
      userId: req.user.id,
    });
    return res.status(201).json(resource);
  }

  async update(req, res, next) {
    const {
      name = null,
      url = null,
      vk = null,
      tg = null,
      youtube = null,
      ok = null,
      inst = null,
      tw = null,
    } = req.body;
    const id = req.params.id;
    const userId = req.user.id;
    try {
      const candidate = await Resources.findOne({ where: { id } });
      if (!candidate) {
        return next(
          ApiError.notFound("Ресурс который вы хотите изменить не найден")
        );
      }
      if (candidate.userId != userId) {
        return next(
          ApiError.forbidden(
            "Ресурс который вы хотите изменить вам не принадлежит"
          )
        );
      }
      await Resources.update(
        {
          name,
          url: url || null,
          vk: vk || null,
          tg: tg || null,
          youtube: youtube || null,
          ok: ok || null,
          inst: inst || null,
          tw: tw || null,
        },
        { where: { id } }
      );
      const resource = await Resources.findOne({ where: { id } });
      return res.status(200).json(resource);
    } catch (error) {
      return next(ApiError.internal());
    }
  }
}

module.exports = new ResourceController();

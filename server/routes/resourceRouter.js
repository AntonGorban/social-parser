const Router = require("express");
const router = new Router();

const ResourceController = require("../controllers/ResourceController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, ResourceController.getAllByUserId);
router.get("/:id", authMiddleware, ResourceController.getOneById);

router.post("/", authMiddleware, ResourceController.create);

router.patch("/:id", authMiddleware, ResourceController.update);

module.exports = router;

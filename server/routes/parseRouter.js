const Router = require("express");
const router = new Router();

const parseController = require("../controllers/parseController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, parseController.getAllByUserId);
router.get("/:id", authMiddleware, parseController.getOneById);

router.post("/", authMiddleware, parseController.create);
router.post("/start", authMiddleware, parseController.start);

module.exports = router;

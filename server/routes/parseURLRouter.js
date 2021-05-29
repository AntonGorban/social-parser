const Router = require("express");
const router = new Router();

const parseURLController = require("../controllers/parseURLController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, parseURLController.getAll);

module.exports = router;

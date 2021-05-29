const Router = require("express");
const router = new Router();

const tokenController = require("../controllers/tokenController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, tokenController.getByUserId);
router.get("/default", authMiddleware, tokenController.getDefault);

router.patch("/vk", authMiddleware, tokenController.updateVk);
router.patch("/tg", authMiddleware, tokenController.updateTg);
router.patch("/youtube", authMiddleware, tokenController.updateYoutube);
router.patch("/inst", authMiddleware, tokenController.setInst);

module.exports = router;

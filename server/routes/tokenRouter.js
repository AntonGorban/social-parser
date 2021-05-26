const Router = require("express");
const router = new Router();

const tokenController = require("../controllers/tokenController");

router.get("/", tokenController.getByUserId);
router.get("/default", tokenController.getDefault);

router.post("/vk", tokenController.setVk);
router.post("/tg", tokenController.setTg);
router.post("/youtube", tokenController.setYoutube);
router.post("/inst", tokenController.updateInst);

router.patch("/vk", tokenController.updateVk);
router.patch("/tg", tokenController.updateTg);
router.patch("/youtube", tokenController.updateYoutube);
router.patch("/inst", tokenController.setInst);

module.exports = router;

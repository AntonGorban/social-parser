const Router = require("express");
const router = new Router();

const resourceController = require("../controllers/resourceController");

router.get("/", resourceController.getAllByUserId);
router.get("/:id", resourceController.getOneById);

router.post("/", resourceController.add);

router.patch("/", resourceController.update);

module.exports = router;

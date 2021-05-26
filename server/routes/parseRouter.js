const Router = require("express");
const router = new Router();

const parseController = require("../controllers/parseController");

router.get("/", parseController.getAllByUserId);
router.get("/:id", parseController.getOneById);
router.get("/headers", parseController.getHeadersByUserId);

router.post("/", parseController.create);

module.exports = router;

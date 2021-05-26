const Router = require("express");
const router = new Router();

const parseURLController = require("../controllers/parseURLController");

router.get("/", parseURLController.getAll);

module.exports = router;

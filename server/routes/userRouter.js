const Router = require("express");
const router = new Router();

const userController = require("../controllers/userController");

router.get("/login", userController.login);
router.get("/auth", userController.auth);

router.post("/registration", userController.registration);

module.exports = router;

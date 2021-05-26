const Router = require("express");
const router = new Router();

const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.get("/login", userController.login);
router.get("/auth", userController.auth);

module.exports = router;

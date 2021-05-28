const Router = require("express");
const router = new Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/auth", authMiddleware, userController.auth);

router.post("/login", userController.login);
router.post("/reg", userController.registration);

module.exports = router;

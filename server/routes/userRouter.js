const Router = require("express");
const router = new Router();

router.post("/registration", (req, res) => {});
router.get("/login", (req, res) => {});
router.get("/auth", (req, res) => {
  res.status(200).json({ message: "Yes !!!" });
});

module.exports = router;

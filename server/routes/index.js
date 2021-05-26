const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");

router.use("/user", userRouter);
// router.use("/token");
// router.use("/resource");
// router.use("/parse");
// router.use("/parse-info");
// router.use("/parse-url");

module.exports = router;

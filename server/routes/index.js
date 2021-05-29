const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const tokenRouter = require("./tokenRouter");
const resourceRouter = require("./resourceRouter");
const parseRouter = require("./parseRouter");
const parseURLRouter = require("./parseURLRouter");

router.use("/user", userRouter);
router.use("/token", tokenRouter);
router.use("/resource", resourceRouter);
router.use("/parse", parseRouter);
router.use("/parse-url", parseURLRouter);

module.exports = router;

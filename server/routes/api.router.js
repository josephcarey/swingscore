const express = require("express");
const router = express.Router();

const userRouter = require("./user.router");
const eventRouter = require("./event.router");
const contestRouter = require("./contest.router");
const personRouter = require("./person.router");

router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/contest", contestRouter);
router.use("/person", personRouter);

module.exports = router;

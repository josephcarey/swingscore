const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const contestListRouter = require("./contestList.router");
const contestRosterRouter = require("./contestRoster.router");
const contestCouplesRouter = require("./contestCouples.router");
const contestResultsRouter = require("./contestResults.router");
const contestScoreRouter = require("./contestScore.router");

router.use("/list", contestListRouter);
router.use("/roster", contestRosterRouter);
router.use("/couples", contestCouplesRouter);
router.use("/results", contestResultsRouter);
router.use("/score", contestScoreRouter);

module.exports = router;

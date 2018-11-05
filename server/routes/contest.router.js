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

router.post("/start/:id", (req, res) => {
  contest_id = req.params.id;

  pool
    .query(
      `
    UPDATE "contest"
    SET "has_started" = true
    WHERE "contest"."id" = $1;
    `,
      [contest_id]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log("error:");
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/finalize/:id", (req, res) => {
  contest_id = req.params.id;

  pool
    .query(
      `
    UPDATE "contest"
    SET "has_ended" = true
    WHERE "contest"."id" = $1;
    `,
      [contest_id]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log("error:");
      console.log(error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  pool
    .query(
      `
      INSERT INTO "contest" ("name", "initials", "event_id")
      VALUES ($1, $2, $3);
    `,
      [req.body.name, req.body.initials, req.body.event_id]
    )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log("Something went wrong:");
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;

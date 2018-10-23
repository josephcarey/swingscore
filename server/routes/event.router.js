const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  pool
    .query(
      `
      SELECT
        "event".*,
        json_agg((SELECT x FROM (SELECT
          "contest"."id",
          "contest"."name",
          "event"."name" AS "event_name") AS x)) AS "contests"
      FROM "event"
      LEFT JOIN "contest" ON "event"."id" = "contest"."event_id"
      GROUP BY "event"."id";
    `
      // THIS NEEDS FIXING THE WAY WE'RE USING IT
    )
    .then(results => {
      res.send(results.rows);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {});

module.exports = router;

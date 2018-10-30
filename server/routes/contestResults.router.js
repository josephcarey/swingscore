const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const performRelativePlacement = require("../modules/relativePlacement");

router.get("/:id", (req, res) => {
  pool
    .query(
      `
      SELECT
        "score"."id",
        "score"."placement",
        "score"."couple_id",
        "score"."judge_id",
        to_json((SELECT x FROM (
            SELECT
                  "lead"."id",
                  "lead"."username",
                  "lead"."img_path"
              ) AS x)) AS "lead",
          to_json((SELECT x FROM (
              SELECT
                  "follow"."id",
                  "follow"."username",
                  "follow"."img_path"
              ) AS x)) AS "follow",
          to_json((SELECT x FROM (
              SELECT
                  "judge"."id",
                  "judge"."username",
                  "judge"."img_path"
              ) AS x)) AS "judge"
      FROM "score"
      JOIN "couple" ON "score"."couple_id" = "couple"."id"
      JOIN "person" "lead" ON "couple"."lead_id" = "lead"."id"
      JOIN "person" "follow" ON "couple"."follow_id" = "follow"."id"
      JOIN "person" "judge" ON "score"."judge_id" = "judge"."id"
      WHERE "couple"."contest_id" = $1
      GROUP BY "score"."id", "lead"."id", "follow"."id", "judge"."id";
    `,
      [req.params.id]
    )
    .then(results => {
      let contestResults = performRelativePlacement(results.rows);
      res.send(contestResults);
    })
    .catch(error => {
      console.log(
        "!!! Something went wrong getting the scores from the database."
      );
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;

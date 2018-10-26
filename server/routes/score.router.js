const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const performRelativePlacement = require("../modules/relativePlacement");

/**
 * GET route template
 */
router.get("/:id", (req, res) => {
  console.log(req.params);

  pool
    .query(
      `
      SELECT
        "couple"."id",
        "couple"."contest_id",
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
          ) AS x)) AS "follow"
      FROM "couple"
      JOIN "person" "lead" ON "lead"."id" = "couple"."lead_id"
      JOIN "person" "follow" ON "follow"."id" = "couple"."follow_id"
      WHERE "contest_id" = $1
      GROUP BY "couple"."id", "lead"."id", "follow"."id";
    `,
      [req.params.id]
    )
    .then(results => {
      res.send(results.rows);
    })
    .catch(error => {
      console.log("!!! Error getting couples for the specified contest.");
      console.log(error);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  let rankingsFromJudge = req.body;

  for (let i = 0; i < rankingsFromJudge.length; i++) {
    pool.query(
      `
        INSERT INTO "score" ("judge_id", "couple_id", "placement")
        VALUES ($1, $2, $3);
      `,
      [req.user.id, rankingsFromJudge[i].id, i + 1]
    );
  }

  console.log(req.body);
  res.sendStatus(200);
});

router.get("/results/:id", (req, res) => {
  console.log(req.params);

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
      // console.log("!!! Information retrieved, pre-scoring:");
      // console.log(results.rows);
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

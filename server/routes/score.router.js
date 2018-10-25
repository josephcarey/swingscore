const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/:id", (req, res) => {
  console.log(req.params);

  pool
    .query(
      `
      SELECT * FROM "couple"
      WHERE "contest_id" = $1;
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

module.exports = router;

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

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
});

module.exports = router;

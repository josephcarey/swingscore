const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
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

router.post('/', (req, res) => {
  
})

module.exports = router;

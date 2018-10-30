const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  pool
    .query(
      `
        SELECT * FROM "contest"
        WHERE "event_id" = $1
      `,
      [req.params.id]
    )
    .then(results => {
      res.send(results.rows);
    });
});

module.exports = router;

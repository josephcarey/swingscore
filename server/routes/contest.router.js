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
        SELECT * FROM "contest"
        WHERE "event_id" = $1
    `,
      [req.params.id]
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

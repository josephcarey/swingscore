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
        SELECT * FROM "event"
    `
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
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(
      `
        SELECT * FROM "event"
        ORDER BY "name" ASC;
      `
    )
    .then(results => {
      res.send(results.rows);
    });
});

module.exports = router;

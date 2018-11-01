const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  pool
    .query(
      `
        SELECT
          "id",
          "username",
          "img_path"
        FROM "person"
      `,
      [req.params.id]
    )
    .then(results => {
      res.send(results.rows);
    });
});

router.get("/role/:contest_id&:role", (req, res) => {
  let role = req.params.role;
  let contest_id = req.params.contest_id;
  pool
    .query(
      `
        SELECT
          "id",
          "username",
          "img_path"
        FROM "person"
      `
    )
    .then(results => {
      let people = results.rows;
      for (let person of people) {
        person.isRole = false;
      }
      pool
        .query(
          `
          SELECT
            *
          FROM "person_contest"
          WHERE "contest_id" = $1 AND "role" = $2;
        `,
          [contest_id, role]
        )
        .then(secondResults => {
          let withRole = secondResults.rows;
          for (let person of people) {
            for (let checking of withRole) {
              if (person.id === checking.person_id) {
                person.isRole = true;
              }
            }
          }
          res.send(people);
        });
    });
});

router.post("/role/:contest_id&:role", (req, res) => {
  let role = req.params.role;
  let contest_id = req.params.contest_id;
  pool
    .query(
      `
      DELETE FROM "person_contest"
      WHERE "contest_id" = $1 AND role = $2;
    `,
      [contest_id, role]
    )
    .then(() => {
      let rolesToAdd = req.body;
      let promises = [];
      for (toAdd of rolesToAdd) {
        promises.push(
          pool
            .query(
              `
            INSERT INTO "person_contest" ("contest_id", "person_id", "role")
            VALUES ($1, $2, $3)
          `,
              [contest_id, toAdd.id, role]
            )
            .catch(error => {
              console.log("### Error adding roles back in to person_contest.");
              console.log(error);
            })
        );
      }
      Promise.all(promises).then(() => {
        res.sendStatus(200);
      });
    })
    .catch(error => {
      console.log("### Error deleting roles from person_contest.");
      console.log(error);
    });
});

module.exports = router;

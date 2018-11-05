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

router.post("/randomize/:id", (req, res) => {
  let contest_id = req.params.id;

  let contestants = {};
  let promises = [];

  promises.push(
    pool
      .query(
        `
      SELECT
        "person"."id",
        "person"."username",
        "person_contest"."bib_number"
      FROM "person"
      JOIN "person_contest" ON "person"."id" = "person_contest"."person_id"
      WHERE "person_contest"."contest_id" = $1 AND "person_contest"."role" = 'lead';
      `,
        [contest_id]
      )
      .then(results => {
        contestants.leads = results.rows;
      })
  );
  promises.push(
    pool
      .query(
        `
      SELECT
        "person"."id",
        "person"."username",
        "person_contest"."bib_number"
      FROM "person"
      JOIN "person_contest" ON "person"."id" = "person_contest"."person_id"
      WHERE "person_contest"."contest_id" = $1 AND "person_contest"."role" = 'follow';
      `,
        [contest_id]
      )
      .then(results => {
        contestants.follows = results.rows;
      })
  );

  Promise.all(promises).then(() => {
    let indexRole;
    let partnerFromRole;
    let indexFrom = [];
    let partnerFrom = [];
    if (contestants.leads.length >= contestants.follows.length) {
      indexRole = "lead";
      indexFrom = contestants.leads.slice(0);
      partnerFromRole = "follow";
      partnerFrom = contestants.follows.slice(0);
    } else {
      indexRole = "follow";
      indexFrom = contestants.follows.slice(0);
      partnerFromRole = "lead";
      partnerFrom = contestants.leads.slice(0);
    }

    // add copies of partners to partnerFrom until it's the same length as indexFrom
    //
    let initialPartnerFrom = partnerFrom.slice(0);
    let optionsThisRound = [];
    while (indexFrom.length > partnerFrom.length) {
      if (optionsThisRound.length === 0) {
        optionsThisRound = initialPartnerFrom.slice(0);
      }

      randomIndex = getRandomInt(optionsThisRound.length);
      toAssign = optionsThisRound.splice(randomIndex, 1);
      partnerFrom.push(toAssign[0]);
    }

    let couples = [];
    for (let i = indexFrom.length - 1; i > 0; i--) {
      randomPartner = partnerFrom.splice(getRandomInt(partnerFrom.length), 1);
      let coupleToAdd = {
        [indexRole]: indexFrom[i],
        [partnerFromRole]: randomPartner[0],
      };
      couples.push(coupleToAdd);
    }

    let couplePromises = [];
    for (couple of couples) {
      couplePromises.push(
        pool.query(
          `
              INSERT INTO "couple" ("contest_id", "lead_id", "follow_id")
              VALUES ($1, $2, $3);
            `,
          [contest_id, couple.lead.id, couple.follow.id]
        )
      );
    }
    Promise.all(couplePromises).then(() => {
      res.sendStatus(200);
    });
  });
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = router;

const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  console.log(req.params.id);

  pool
    .query(
      `
        SELECT
          "person"."id",
          "person"."username",
          "person"."img_path",
          "person_contest"."role",
          "person_contest"."bib_number"
        FROM "person"
        JOIN "person_contest" ON "person"."id" = "person_contest"."person_id"
        AND "person_contest"."contest_id" = $1;
      `,
      [req.params.id]
    )
    .then(results => {
      console.log("start rebuilding data");
      let allParticipants = results.rows;
      let toSend = { leads: [], follows: [], judges: [] };

      for (participant of allParticipants) {
        switch (participant.role) {
          case "lead":
            toSend.leads.push(participant);
            break;
          case "follow":
            toSend.follows.push(participant);
            break;
          case "judge":
            toSend.judges.push(participant);
            break;
          default:
            console.log("warning: unhandled role detected:", participant.role);
            break;
        }
      }
      console.log(toSend);
      res.send(toSend);
    });
});

module.exports = router;

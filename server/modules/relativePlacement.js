const performRelativePlacement = scores => {
  // we got in a list of scores, format is:
  // couple_id    judge_id    placement

  // convert to initial score_row format:
  // couple     J1 Score ... etc

  let scoreRows = [];

  // loop through all of the scores we got
  for (let score of scores) {
    // if the score references a couple that doesn't exist, create that couple
    if (!scoreRows.map(score => score.couple_id).includes(score.couple_id)) {
      scoreRows.push({
        finalPlacement: 0,
        couple_id: score.couple_id,
        judgePlacements: [],
        // numberOfEachPlacement starts out with a 0 at position zero so that we
        // can be 1-indexed later
        calculatedPlacements: [0],
      });
    }
    // append score object { judge_id, placement } to the placements array
    for (let currentScoreRow of scoreRows) {
      if (currentScoreRow.couple_id === score.couple_id) {
        currentScoreRow.judgePlacements.push({
          placement: score.placement,
          judge_id: score.judge_id,
        });
      }
    }
  }
  // end loop

  // loop through each row
  for (let currentScoreRow of scoreRows) {
    // add an entry in numberOfEachPlacement for each possible placement
    for (let i = 0; i < scoreRows.length; i++) {
      currentScoreRow.calculatedPlacements.push({
        countThisLevel: 0,
        countThisLevelAndBetter: 0,
        sumThisLevelAndBetter: 0,
      });
    }
    // loop through each score object in the placements array and
    // increment the appropriate spot in numberOfEachPlacement
    for (let currentPlacement of currentScoreRow.judgePlacements) {
      // increment the count at this level
      currentScoreRow.calculatedPlacements[currentPlacement.placement]
        .countThisLevel++;
      currentScoreRow.calculatedPlacements[currentPlacement.placement]
        .countThisLevelAndBetter++;
      currentScoreRow.calculatedPlacements[
        currentPlacement.placement
      ].sumThisLevelAndBetter += currentPlacement.placement;
    }
  }

  // fill out the this level and betters
  for (i = 0; i < scoreRows.length; i++) {
    for (j = 2; j <= scoreRows.length; j++) {
      scoreRows[i].calculatedPlacements[j].countThisLevelAndBetter +=
        scoreRows[i].calculatedPlacements[j - 1].countThisLevelAndBetter;
      scoreRows[i].calculatedPlacements[j].sumThisLevelAndBetter +=
        scoreRows[i].calculatedPlacements[j - 1].sumThisLevelAndBetter;
    }
  }

  // do the logic for relative placement
  console.log(
    "########## ########## ########## ########## ########## ########## ##########"
  );
  console.log(
    "########## ##########   STARTING SCORING    ########## ########## ##########"
  );
  console.log(
    "########## ########## ########## ########## ########## ########## ##########"
  );

  // set the total number of judges
  numberOfJudges = scoreRows[0].judgePlacements.length;

  // while we're at it, set the quorum
  quorum = Math.ceil(numberOfJudges / 2);

  console.log(
    "### There are",
    numberOfJudges,
    "judges, and the quorum is:",
    quorum
  );

  // make a copy of the existing scores
  let unassignedScores = scoreRows.slice(0);
  // set up a storage for the scores we're going to return
  let scoresToReturn = [];

  // loop through each potential placement
  for (
    let placementToAssign = 1;
    placementToAssign < scoreRows.length;
    placementToAssign++
  ) {
    console.log("### Working on placement:", placementToAssign);
    // make a copy of the unassignedScores for us to use below called candidateScores
    let candidateScores = unassignedScores.slice(0);
    console.log("### The candidates are:");
    console.log("### Considering couples:");
    console.log(unassignedScores.map(score => score.couple_id));
    // set highestPlacementToInclude = 1;
    let highestPlacementToInclude = 1;
    // while there's any scores left in candidateScores--
    while (candidateScores.length > 0) {
      console.log(
        "### Considering this place and better:",
        highestPlacementToInclude
      );
      // fix this!
      if (highestPlacementToInclude > scoreRows.length) {
        highestPlacementToInclude--;
        console.log(
          "This is the really deep tie-breaker. It isn't written yet, so we just take the first one."
        );
        while (candidateScores.length > 1) {
          candidateScores.pop();
        }
      }

      // ********** FIRST PASS **********
      // loop through the scores
      for (let i = candidateScores.length - 1; i >= 0; i--) {
        // if the countAndBetter is less than quorum...
        console.log("### Considering couple:", candidateScores[i].couple_id);
        console.log(
          "### This score and better:",
          candidateScores[i].calculatedPlacements[highestPlacementToInclude]
            .sumThisLevelAndBetter
        );
        if (
          candidateScores[i].calculatedPlacements[highestPlacementToInclude]
            .sumThisLevelAndBetter < quorum
        ) {
          // get rid of 'em
          console.log("### Not high enough. Remove them from consideration.");
          candidateScores.splice(i, 1);
        } else {
          console.log("### They have enough of these scores. They can stay.");
        }
        // end loop
      }
      console.log(
        "### At the end of the first pass, the following couples remain in consideration:"
      );
      console.log(candidateScores.map(score => score.couple_id));
      // ********** SECOND PASS **********
      // if there is more than one score left in candidateScores--
      if (candidateScores.length > 1) {
        console.log(
          "### More than one couple left in consideration. Try to break the tie."
        );
        // if any have fewer than any of the others, eliminate those
        // set a highestCount
        let highestCount = 0;
        // loop through each candidate score
        for (i = candidateScores.length - 1; i >= 0; i--) {
          console.log("### Considering couple:", candidateScores[i].couple_id);
          console.log("### Highest count is:", highestCount);
          // if the candidate score count is better than highest count (or equal)
          if (
            candidateScores[i].calculatedPlacements.countThisLevelAndBetter >=
            highestCount
          ) {
            console.log("### They had a higher count.");
            // set highestCount to that (equal sets to the same, but doesn't get eliminated)
            highestCount =
              candidateScores[i].calculatedPlacements.countThisLevelAndBetter;
            console.log("### highestCount set to:", highestCount);
          } else {
            console.log("### They had a lower count and will be removed.");
            // if not, eliminate that score from consideration
            candidateScores.splice(i, 1);
          }
        }
        // if any have lower "quality" scores, eliminate those
        // set a highestSum
        let highestSum = 0;
        // loop through each remaining candidate score
        for (i = candidateScores.length - 1; i >= 0; i--) {
          console.log("### Considering couple:", candidateScores[i].couple_id);
          console.log("### Highest sum is:", highestSum);
          // if the candidate score sum is better than highest sum (or equal)
          if (
            candidateScores[i].calculatedPlacements.sumThisLevelAndBetter >=
            highestSum
          ) {
            console.log("### They had a higher sum.");
            highestSum =
              candidateScores[i].calculatedPlacements.sumThisLevelAndBetter;
            console.log("### highestSum set to:", highestSum);
            // set highestSum to that (equal sets to same number to avoid getting spliced)
          } else {
            console.log("### They had a lower sum and will be removed.");
            candidateScores.splice(i, 1);
          }
        }
      }
      console.log(
        "### At the end of the second pass, the following couples remain in consideration:"
      );
      console.log(candidateScores.map(score => score.couple_id));
      // ********** STEP 3 **********
      // if there is exactly one score left
      if (candidateScores.length === 1) {
        console.log("### There is exactly one couple left!");
        console.log(
          "### They should be assigned placement:",
          placementToAssign
        );
        // push it into scoresToReturn
        scoresToReturn.push({
          ...candidateScores[0],
          finalPlacement: placementToAssign,
        });
        // remove it from unassignedScores
        // loop through unassignedScores
        for (i = unassignedScores.length - 1; i >= 0; i--) {
          // if this is the correct entry (couple_id is unique)
          if (unassignedScores[i].couple_id == candidateScores[0].couple_id) {
            // slice out the one we just assigned
            unassignedScores.splice(i, 1);
          }
        }
        // pop it out of candidateScores--after this candidateScores should be empty
        candidateScores.pop();
      }
      // ********** TIDY UP **********
      // in case we're going a level deeper, increment highestPlacementToInclude
      highestPlacementToInclude++;
      // the while loop finishes--
      //  if there are 0, it means we assigned the placement; the while
      // -- is concluded and doesn't run, so the loop increments and does the next placement
      // if there are >1, it means that we need to examine the next placement down.
    }
  }

  console.log(scoresToReturn);
  // return scoreRows;
  return scoresToReturn;
};

module.exports = performRelativePlacement;

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
        finalPlacement: "",
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

  // set the total number of judges
  numberOfJudges = scoreRows[0].judgePlacements.length;

  // while we're at it, set the quorum
  quorum = Math.ceil(numberOfJudges / 2);

  // loop through each possible placement
  for (
    let placementInQuestion = 1;
    placementInQuestion < scoreRows.length;
    placementInQuestion++
  ) {
    // loop through each placementsAndUpToInclude, starting at 1
    for (
      let highestPlacementToInclude = 1;
      highestPlacementToInclude < scoreRows.length;
      highestPlacementToInclude++
    ) {
      // create a working copy of the set of score_rows
      workingScores = scoreRows.slice(0);
      candidateScores = [];
      // loop through the working copy
      for (let workingScore of workingScores) {
        // calculate the total number of places up to placementsAndUpToInclude
        let placementsCounted = 0;
        for (let j = 1; j <= highestPlacementToInclude; j++) {
          placementsCounted +=
            workingScore.calculatedPlacements[j].countThisLevel;
        }
        // check that against the quorum; if it's higher, push the couple onto candidateScores
        if (placementsCounted >= quorum) {
          candidateScores.push(workingScore);
        }
      }
      // if there is only one couple left, award them the placement
    }
  }
  // if there is more than one couple left, one of them should be awarded the placement;
  // next step is to check the quality of each of their scores (sum of )
  // failing that, we use the head judge score
  // if no one has been awarded, go increment placementsAndUp and move on
  //

  return scoreRows;
};

module.exports = performRelativePlacement;

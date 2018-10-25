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
        couple_id: score.couple_id,
        placements: [],
        // numberOfEachPlacement starts out with a 0 at position zero so that we
        // can be 1-indexed later
        numberOfEachPlacement: [0],
      });
    }
    // append score object { judge_id, placement } to the placements array
    for (let currentScoreRow of scoreRows) {
      if (currentScoreRow.couple_id === score.couple_id) {
        currentScoreRow.placements.push({
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
      currentScoreRow.numberOfEachPlacement.push(0);
    }
    // loop through each score object in the placements array and
    // increment the appropriate spot in numberOfEachPlacement
    for (let currentPlacement of currentScoreRow.placements) {
      currentScoreRow.numberOfEachPlacement[currentPlacement.placement]++;
    }
  }

  // do the logic for relative placement

  // set the total number of judges

  // loop through each possible placement

  return scoreRows;
};

module.exports = performRelativePlacement;

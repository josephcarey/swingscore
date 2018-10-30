const startingResults = [
  {
    lead: { username: "" },
    follow: { username: "" },
    judgePlacements: [],
    calculatedPlacements: [],
  },
];

const contestResultsReducer = (state = startingResults, action) => {
  switch (action.type) {
    case "SET_CONTEST_RESULTS":
      return action.payload;
    case "UNSET_CONTEST_RESULTS":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default contestResultsReducer;

const currentPageReducer = (state = "selectEvent", action) => {
  switch (action.type) {
    case "NAVIGATE_TO_SELECT_EVENT":
      return "selectEvent";
    case "NAVIGATE_TO_SELECT_CONTEST":
      return "selectContest";
    case "NAVIGATE_TO_RESULTS":
      return "results";
    case "NAVIGATE_TO_JUDGE":
      return "judge";
    case "NAVIGATE_TO_ROSTER":
      return "roster";
    default:
      return state;
  }
};

export default currentPageReducer;

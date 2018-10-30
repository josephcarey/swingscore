const startingRoster = [
  {
    leads: [],
    follows: [],
    judges: [],
  },
];

const contestRosterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CONTEST_ROSTER":
      return action.payload;
    case "UNSET_CONTEST_ROSTER":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default contestRosterReducer;

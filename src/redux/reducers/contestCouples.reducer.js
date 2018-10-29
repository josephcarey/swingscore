const contestCouplesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CONTEST_COUPLES":
      return action.payload;
    case "UNSET_CONTEST_COUPLES":
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default contestCouplesReducer;

const contestReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_CONTEST":
      return action.payload;
    case "UNSET_CONTEST":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default contestReducer;

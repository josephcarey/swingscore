const selectedEventReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_EVENT":
      return action.payload;
    case "UNSET_SELECTED_EVENT":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default selectedEventReducer;

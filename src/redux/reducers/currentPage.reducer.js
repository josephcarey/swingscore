const currentPageReducer = (state = "selectEvent", action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return action.payload;
    default:
      return state;
  }
};

export default currentPageReducer;

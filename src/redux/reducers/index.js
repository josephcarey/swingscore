import { combineReducers } from "redux";

import errors from "./errors.reducer";
import loginMode from "./loginMode.reducer";
import user from "./user.reducer";

import loading from "./loading.reducer";
import currentPage from "./currentPage.reducer";
import eventList from "./eventList.reducer";
import selectedEvent from "./selectedEvent.reducer";
import contestList from "./contestList.reducer";
import selectedContest from "./selectedContest.reducer";
import contestRoster from "./contestRoster.reducer";
import contestCouples from "./contestCouples.reducer";
import contestResults from "./contestResults.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  loading, // holds the state of loading
  currentPage, // holds the string of the current page name
  eventList, // holds a list of all the events
  selectedEvent, // holds the selected event
  contestList, // holds a list of the contests in the selected event
  selectedContest, // holds the details of the selected contest
  contestRoster, // holds a list of all of the pepople in the contest
  contestCouples, // holds a list of all of the couples in the contest
  contestResults, // holds the results object
});

export default rootReducer;

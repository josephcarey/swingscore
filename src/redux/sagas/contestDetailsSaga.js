import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchContestDetails(action) {
  try {
    const detailsFromServer = yield call(axios, {
      method: "GET",
      url: `/api/contest${action.payload}`,
    });
    yield put({ type: "SET_EVENT_LIST", payload: detailsFromServer.data });
  } catch (error) {
    console.log("Error with getting the list of events:");
    console.log(error);
  }
}

function* eventListSaga() {
  yield takeLatest("FETCH_CONTEST_DETAILS", fetchContestDetails);
}

export default eventListSaga;

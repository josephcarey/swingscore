import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchContestRoster(action) {
  try {
    const rosterFromServer = yield call(axios, {
      method: "GET",
      url: `/api/score/${action.payload}`,
    });
    yield put({ type: "SET_CONTEST_RESULTS", payload: rosterFromServer.data });
  } catch (error) {
    console.log("Error with getting the results:");
    console.log(error);
  }
  yield put({ type: "UNSET_LOADING" });
}

function* contestRosterSaga() {
  yield takeLatest("FETCH_CONTEST_RESULTS", fetchContestRoster);
}

export default contestRosterSaga;

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchContestResults(action) {
  try {
    const resultsFromServer = yield call(axios, {
      method: "GET",
      url: `/api/score/${action.payload}`,
    });
    yield put({ type: "SET_CONTEST_RESULTS", payload: resultsFromServer.data });
  } catch (error) {
    console.log("Error with getting the results:");
    console.log(error);
  }
  yield put({ type: "UNSET_LOADING" });
}

function* contestResultsSaga() {
  yield takeLatest("FETCH_CONTEST_RESULTS", fetchContestResults);
}

export default contestResultsSaga;

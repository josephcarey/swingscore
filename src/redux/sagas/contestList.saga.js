import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchContestList(action) {
  try {
    const contestsFromServer = yield call(axios, {
      method: "GET",
      url: `/api/contest/${action.payload}`,
    });
    yield put({ type: "SET_CONTEST_LIST", payload: contestsFromServer.data });
  } catch (error) {
    console.log("Error with getting the list of events:");
    console.log(error);
  }
  yield put({ type: "UNSET_LOADING" });
}

function* contestListSaga() {
  yield takeLatest("FETCH_CONTEST_LIST", fetchContestList);
}

export default contestListSaga;

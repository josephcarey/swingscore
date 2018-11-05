import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchContestCouples(action) {
  try {
    const couplesFromServer = yield call(axios, {
      method: "GET",
      url: `/api/contest/couples/${action.payload}`,
    });
    yield put({ type: "SET_CONTEST_COUPLES", payload: couplesFromServer.data });
  } catch (error) {
    console.log("Error with getting the couples:");
    console.log(error);
  }
  yield put({ type: "UNSET_LOADING" });
}

function* makeContestCouples(action) {
  try {
    yield call(axios, {
      method: "POST",
      url: `/api/contest/couples/${action.payload}`,
    });
  } catch (error) {
    console.log(error);
  }
}

function* contestCouplesSaga() {
  yield takeLatest("FETCH_CONTEST_COUPLES", fetchContestCouples);
  yield takeLatest("MAKE_CONTEST_COUPLES", makeContestCouples);
}

export default contestCouplesSaga;

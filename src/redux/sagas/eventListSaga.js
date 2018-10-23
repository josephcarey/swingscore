import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEventList(action) {
  try {
    const eventsFromServer = yield call(axios, {
      method: "GET",
      url: "/api/event",
    });
    yield put({ type: "SET_EVENT_LIST", payload: eventsFromServer.data });
  } catch (error) {
    console.log("Error with getting the list of events:");
    console.log(error);
  }
}

function* eventListSaga() {
  yield takeLatest("FETCH_EVENT_LIST", fetchEventList);
}

export default eventListSaga;

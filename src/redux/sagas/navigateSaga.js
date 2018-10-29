import { call, put, takeLatest } from "redux-saga/effects";

function* NavigateTo(action) {
  yield put({ type: "SET_LOADING" });
  switch (action.payload) {
    case "selectEvent":
      yield put({ type: "SET_CURRENT_PAGE", payload: action.payload });
      yield put({ type: "FETCH_EVENT_LIST" });
      break;
    case "selectContest":
      yield put({ type: "SET_CURRENT_PAGE", payload: action.payload });
      break;
    case "results":
      yield put({ type: "SET_CURRENT_PAGE", payload: action.payload });
      break;
    case "judge":
      yield put({ type: "SET_CURRENT_PAGE", payload: action.payload });
      break;
    case "roster":
      yield put({ type: "SET_CURRENT_PAGE", payload: action.payload });
      break;
    default:
  }
  yield put({ type: "UNSET_LOADING" });
}

function* eventListSaga() {
  yield takeLatest("NAVIGATE_TO", NavigateTo);
}

export default eventListSaga;

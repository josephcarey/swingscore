import { put, takeLatest, select } from "redux-saga/effects";
import { getSelectedContest } from "../selectors/index.selectors";

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
    case "correctView":
      const selectedContest = yield select(getSelectedContest);
      if (selectedContest.has_ended) {
        yield put({ type: "SET_CURRENT_PAGE", payload: "results" });
      } else if (selectedContest.has_started) {
        yield put({ type: "SET_CURRENT_PAGE", payload: "judge" });
      } else {
        yield put({ type: "SET_CURRENT_PAGE", payload: "roster" });
      }
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

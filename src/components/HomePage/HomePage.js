import React from "react";
import { connect } from "react-redux";

import PickContestPage from "../PickContestPage/PickContestPage";
import RosterPage from "../RosterPage/RosterPage";
import TestDnD from "../TestDnD/TestDnD";
import ResultsView from "../ResultsView/ResultsView";

const HomePage = props => {
  return (
    <>
      <ResultsView />
      {/* {!props.contest.id ? <PickContestPage /> : <TestDnD />} */}
      {/* <TestDnD /> */}
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  contest: state.contest,
});

export default connect(mapStateToProps)(HomePage);

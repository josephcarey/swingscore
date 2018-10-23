import React from "react";
import { connect } from "react-redux";

import PickContestPage from "../PickContestPage/PickContestPage";
import RosterPage from "../RosterPage/RosterPage";

const HomePage = props => {
  return <>{!props.contest.id ? <PickContestPage /> : <RosterPage />}</>;
};

const mapStateToProps = state => ({
  user: state.user,
  contest: state.contest,
});

export default connect(mapStateToProps)(HomePage);

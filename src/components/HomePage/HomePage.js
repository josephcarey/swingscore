import React from "react";
import { connect } from "react-redux";

import PickContestPage from "../PickContestPage/PickContestPage";

const HomePage = props => {
  return (
    <>
      {!props.contest.id ? (
        <PickContestPage />
      ) : (
        <div>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
          <p>This</p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  contest: state.contest,
});

export default connect(mapStateToProps)(HomePage);

import React from "react";
import { connect } from "react-redux";

import NavTop from "../NavTop/NavTop";
import ViewLoading from "../ViewLoading/ViewLoading";
import ViewSelectEvent from "../ViewSelectEvent/ViewSelectEvent";
import ViewSelectContest from "../ViewSelectContest/ViewSelectContest";
import ViewResults from "../ViewResults/ViewResults";
import ViewJudge from "../ViewJudge/ViewJudge";
import ViewRoster from "../ViewRoster/ViewRoster";

const ViewPagePicker = props => {
  return (
    <>
      <NavTop />
      {this.props.loading ? (
        <ViewLoading />
      ) : (
        <>
          {() => {
            switch (props.currentPage) {
              case "selectEvent":
                return <ViewSelectEvent />;
              case "selectContest":
                return <ViewSelectContest />;
              case "results":
                return <ViewResults />;
              case "judge":
                return <ViewJudge />;
              case "roster":
                return <ViewRoster />;
            }
          }}
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.loading,
  currentPage: state.currentPage,
  user: state.user,
  contest: state.contest,
});

export default connect(mapStateToProps)(ViewPagePicker);

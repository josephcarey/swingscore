import React from "react";
import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import ViewLoading from "../ViewLoading/ViewLoading";
import ViewSelectEvent from "../ViewSelectEvent/ViewSelectEvent";
import ViewSelectContest from "../ViewSelectContest/ViewSelectContest";
import ViewResults from "../ViewResults/ViewResults";
import ViewFinalize from "../ViewFinalize/ViewFinalize";
import ViewJudge from "../ViewJudge/ViewJudge";
import ViewCouples from "../ViewCouples/ViewCouples";
import ViewRoster from "../ViewRoster/ViewRoster";

const ViewPagePicker = props => {
  return (
    <>
      <Nav />
      {props.loading ? (
        <ViewLoading />
      ) : (
        <>
          {props.currentPage === "selectEvent" && <ViewSelectEvent />}
          {props.currentPage === "selectContest" && <ViewSelectContest />}
          {props.currentPage === "results" && <ViewResults />}
          {props.currentPage === "finalize" && <ViewFinalize />}
          {props.currentPage === "judge" && <ViewJudge />}
          {props.currentPage === "couples" && <ViewCouples />}
          {props.currentPage === "roster" && <ViewRoster />}
          {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
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

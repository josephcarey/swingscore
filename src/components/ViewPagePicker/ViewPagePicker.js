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
      {!props.loading ? (
        <ViewLoading />
      ) : (
        <>
          <p>VIEWPAGEPICKER</p>
          {props.currentPage === "selectEvent" && <ViewSelectEvent />}
          {props.currentPage === "selectContest" && <ViewSelectContest />}
          {props.currentPage === "results" && <ViewResults />}
          {props.currentPage === "judge" && <ViewJudge />}
          {props.currentPage === "roster" && <ViewRoster />}
          <pre>{JSON.stringify(props, null, 2)}</pre>
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

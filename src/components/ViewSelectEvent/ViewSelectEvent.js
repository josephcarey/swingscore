import React, { Component } from "react";
import { connect } from "react-redux";

import MyList from "../MyList/MyList";

class ViewSelectEvent extends Component {
  selectEvent = event => {
    this.props.dispatch({ type: "SET_EVENT", payload: event });
    this.props.dispatch({ type: "NAVIGATE_TO", payload: "selectContest" });
  };

  render() {
    return (
      <>
        <MyList
          heading={"Select Event"}
          headingLarge
          list={this.props.eventList}
          handleClick={this.selectEvent}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  eventList: state.eventList,
});

export default connect(mapStateToProps)(ViewSelectEvent);

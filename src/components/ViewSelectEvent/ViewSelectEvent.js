import React, { Component } from "react";
import { connect } from "react-redux";

import MyList from "../MyList/MyList";

class ViewSelectEvent extends Component {
  selectEvent = eventSelected => {
    this.props.dispatch({ type: "SET_SELECTED_EVENT", payload: eventSelected });
    this.props.dispatch({ type: "UNSET_SELECTED_CONTEST" });
    this.props.dispatch({ type: "NAVIGATE_TO", payload: "selectContest" });
  };

  render() {
    return (
      <>
        <MyList
          heading={"swingscore"}
          subheading={"Select an event"}
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

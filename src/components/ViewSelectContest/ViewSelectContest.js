import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";

class ViewSelectContest extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONTEST_LIST",
      payload: this.props.selectedEvent.id,
    });
  }
  selectContest = contest => {
    this.props.dispatch({ type: "SET_SELECTED_CONTEST", payload: contest });
    this.props.dispatch({ type: "NAVIGATE_TO", payload: "correctView" });
  };

  render() {
    return (
      <>
        <MyHeading>{this.props.selectedEvent.name}</MyHeading>
        <MySubHeading>Select contest</MySubHeading>
        <MyList
          list={this.props.contestList}
          handleClick={this.selectContest}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contestList: state.contestList,
  selectedEvent: state.selectedEvent,
  selectedContest: state.selectedContest,
});

export default connect(mapStateToProps)(ViewSelectContest);

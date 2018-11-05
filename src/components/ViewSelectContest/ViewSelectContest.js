import React, { Component } from "react";
import { connect } from "react-redux";

import MyBackButton from "../MyBackButton/MyBackButton";
import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import MyButton from "../MyButton/MyButton";

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

  handleAddContest = () => {
    console.log("clicked");
  };

  backClick = () => {
    console.log("clicked");
  };

  backButton = () => {
    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: "selectEvent",
    });
  };

  render() {
    return (
      <>
        <MyBackButton onClick={this.backButton}>
          Back to event list
        </MyBackButton>
        {/* <a>Back to event list</a> */}
        {/* <a onClick={this.backClick}>Back to event list</a> */}
        <MyHeading noTopHeader>{this.props.selectedEvent.name}</MyHeading>
        <MySubHeading>Select contest</MySubHeading>
        <MyList
          list={this.props.contestList}
          handleClick={this.selectContest}
        />
        <MyButton onClick={this.handleAddContest}>Add Contest</MyButton>
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

import React, { Component } from "react";
import { connect } from "react-redux";

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
    this.props.dispatch({ type: "NAVIGATE_TO", payload: "selectContest" });
  };

  render() {
    return (
      <>
        <MyList
          heading={"Select Contest"}
          subheading={this.props.selectedEvent.name}
          list={this.props.contestList}
          handleClick={this.selectContest}
        />
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
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

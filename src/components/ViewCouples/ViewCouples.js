import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import MyButton from "../MyButton/MyButton";
import MyCenterButton from "../MyCenterButton/MyCenterButton";

import ModalAddToRole from "../ModalAddToRole/ModalAddToRole";

class ViewRoster extends Component {
  state = {};
  componentDidMount() {
    this.getCouples();
  }

  getCouples = () => {
    this.props.dispatch({
      type: "FETCH_CONTEST_COUPLES",
      payload: this.props.selectedContest.id,
    });
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedContest.id,
    });
  };

  handleRandomizeClick = () => {
    this.props.dispatch({
      type: "MAKE_CONTEST_COUPLES",
      payload: this.props.selectedContest.id,
    });
  };

  handleStartClick = () => {
    this.props.dispatch({
      type: "START_CONTEST",
      payload: this.props.selectedContest.id,
    });

    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: "judge",
    });
  };

  render() {
    return (
      <div>
        <MyHeading>{this.props.selectedContest.name}</MyHeading>
        <MySubHeading>Couples</MySubHeading>
        {this.props.contestRoster.leads[1] ? (
          <MyButton disabled>Randomize</MyButton>
        ) : (
          <MyButton onClick={this.handleRandomizeClick}>Randomize</MyButton>
        )}

        <MyCenterButton fixed onClick={this.handleStartClick}>
          Start!
        </MyCenterButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  selectedEvent: state.selectedEvent,
  selectedContest: state.selectedContest,
  contestRoster: state.contestRoster,
  contestCouples: state.contestCouples,
});

export default connect(mapStateToProps)(ViewRoster);

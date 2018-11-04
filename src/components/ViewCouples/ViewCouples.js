import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import MyButton from "../MyButton/MyButton";
import MyCenterButton from "../MyCenterButton/MyCenterButton";

import ModalAddToRole from "../ModalAddToRole/ModalAddToRole";

class ViewRoster extends Component {
  state = {};
  componentDidMount() {
    this.getRoster();
  }

  getRoster = () => {
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedContest.id
    });
  };

  randomizeContest = () => {
    axios({
      method: "POST",
      url: "/api/contest/couples/randomize/1"
    });
  };

  render() {
    return (
      <div>
        <MyHeading>{this.props.selectedContest.name}</MyHeading>
        <MySubHeading>Couples</MySubHeading>
        <MyCenterButton fixed onClick={this.randomizeContest}>
          Randomize
        </MyCenterButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  selectedEvent: state.selectedEvent,
  selectedContest: state.selectedContest,
  contestRoster: state.contestRoster
});

export default connect(mapStateToProps)(ViewRoster);

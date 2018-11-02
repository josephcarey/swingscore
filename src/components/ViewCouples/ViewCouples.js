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
    this.getRoster();
  }

  getRoster = () => {
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedContest.id,
    });
  };

  render() {
    return (
      <div>
        <MyHeading>{this.props.selectedContest.name}</MyHeading>
        <MySubHeading>Couples</MySubHeading>
        <MyCenterButton disabled fixed>
          Start Contest
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
});

export default connect(mapStateToProps)(ViewRoster);

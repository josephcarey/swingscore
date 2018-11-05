import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import MyCenterButton from "../MyCenterButton/MyCenterButton";

import ModalAddToRole from "../ModalAddToRole/ModalAddToRole";

class ViewCouples extends Component {
  componentDidMount() {
    this.getRoster();
  }

  getRoster = () => {
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedContest.id,
    });
  };

  continueButton = () => {
    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: "couples",
    });
  };

  render() {
    return (
      <div>
        <MyHeading>{this.props.selectedContest.name}</MyHeading>
        <MySubHeading>Leads</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.leads}
          // handleClick={this.selectContest}
        />
        <ModalAddToRole
          role={"lead"}
          buttonText={"Pick Leads"}
          contest_id={this.props.selectedContest.id}
          onClose={this.getRoster}
        />

        <MySubHeading>Follows</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.follows}
          // handleClick={this.selectContest}
        />
        <ModalAddToRole
          role={"follow"}
          buttonText={"Pick Follows"}
          contest_id={this.props.selectedContest.id}
          onClose={this.getRoster}
        />

        <MySubHeading>Judges</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.judges}
          // handleClick={this.selectContest}
        />
        <ModalAddToRole
          role={"judge"}
          buttonText={"Pick Judges"}
          contest_id={this.props.selectedContest.id}
          onClose={this.getRoster}
        />
        <MyCenterButton fixed onClick={this.continueButton}>
          To Couples
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

export default connect(mapStateToProps)(ViewCouples);

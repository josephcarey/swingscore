import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import RosterAddButton from "../RosterAddButton/RosterAddButton";

import SimpleModal from "../SimpleModal/SimpleModal";
import ModalAddLead from "../ModalAddLead/ModalAddLead";

class ViewRoster extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedContest.id,
    });
  }

  render() {
    return (
      <div>
        <SimpleModal>Cool!</SimpleModal>
        <MyHeading>{this.props.selectedContest.name}</MyHeading>
        <MySubHeading>Leads</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.leads}
          // handleClick={this.selectContest}
        />
        <RosterAddButton>Add Lead</RosterAddButton>
        <ModalAddLead />
        {/* <ModalAddToRole role={"lead"} /> */}

        <MySubHeading>Follows</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.follows}
          // handleClick={this.selectContest}
        />
        <RosterAddButton>Add Follow</RosterAddButton>
        <MySubHeading>Judges</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.judges}
          // handleClick={this.selectContest}
        />
        <RosterAddButton>Add Judge</RosterAddButton>
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

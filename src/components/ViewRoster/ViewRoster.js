import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import RosterAddButton from "../RosterAddButton/RosterAddButton";

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
        <MyHeading text={this.props.selectedContest.name} />
        <MySubHeading text={"Leads"} />
        <MyList
          people
          list={this.props.contestRoster.leads}
          // handleClick={this.selectContest}
        />
        <RosterAddButton>Add Lead</RosterAddButton>
        <MySubHeading text={"Follows"} />
        <MyList
          people
          list={this.props.contestRoster.follows}
          // handleClick={this.selectContest}
        />
        <RosterAddButton>Add Follow</RosterAddButton>
        <MySubHeading text={"Judges"} />
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

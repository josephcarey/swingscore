import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";

class ViewRoster extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedEvent.id,
    });
  }

  render() {
    return (
      <div>
        {/* <MyList
          heading={this.props.selectedEvent.name}
          subheading={"Select contest"}
          list={this.props.contestRoster}
          handleClick={this.selectContest}
        /> */}
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
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

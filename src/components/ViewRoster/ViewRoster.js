import React, { Component } from "react";
import { connect } from "react-redux";

import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import MyButton from "../MyButton/MyButton";

import SimpleModal from "../SimpleModal/SimpleModal";
import ModalAddLead from "../ModalAddLead/ModalAddLead";
import ModalAddToRole from "../ModalAddToRole/ModalAddToRole";

class ViewRoster extends Component {
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
        <MySubHeading>Leads</MySubHeading>
        <MyList
          people
          list={this.props.contestRoster.leads}
          // handleClick={this.selectContest}
        />
        <ModalAddToRole
          role={"lead"}
          buttonText={"Add Lead"}
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
          buttonText={"Add Follow"}
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
          buttonText={"Add Judge"}
          contest_id={this.props.selectedContest.id}
          onClose={this.getRoster}
        />
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

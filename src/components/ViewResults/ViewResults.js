import React, { Component } from "react";
import { connect } from "react-redux";

import MyBackButton from "../MyBackButton/MyBackButton";
import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyButtonGroup from "../MyButtonGroup/MyButtonGroup";
import ResultsTable from "../ResultsTable/ResultsTable";

class ViewResults extends Component {
  state = {
    typeOfView: "table",
    results: [
      {
        lead: { username: "" },
        follow: { username: "" },
        judgePlacements: [],
        calculatedPlacements: [],
      },
    ],
  };

  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_CONTEST_RESULTS",
      payload: this.props.selectedContest.id,
    });
  }

  handleButtonGroupChange = (event, typeOfView) =>
    this.setState({ typeOfView });

  backButton = () => {
    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: "selectContest",
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MyBackButton onClick={this.backButton}>
          Back to contest list
        </MyBackButton>
        <MyHeading noTopHeader>{this.props.selectedEvent.name}</MyHeading>
        <MySubHeading>{this.props.selectedContest.name}</MySubHeading>
        <MyButtonGroup
          value={this.state.typeOfView}
          onChange={this.handleButtonGroupChange}
          buttons={[
            { value: "table", text: "Table" },
            { value: "byCouple", text: "By Couple" },
            { value: "byJudge", text: "By Judge" },
          ]}
        />

        {this.state.typeOfView === "table" && (
          <ResultsTable results={this.props.contestResults} />
        )}
        {this.state.typeOfView === "byCouple" && <p>byCouple</p>}
        {this.state.typeOfView === "byJudge" && <p>byJudge</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  contestList: state.contestList,
  selectedEvent: state.selectedEvent,
  selectedContest: state.selectedContest,
  contestResults: state.contestResults,
});

export default connect(mapStateToProps)(ViewResults);

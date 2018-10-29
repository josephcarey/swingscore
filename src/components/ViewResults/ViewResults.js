import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab/";

const styles = theme => ({
  heading: {
    padding: 16,
  },
  subheading: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: `${theme.spacing.unit}px 0`,
    background: theme.palette.background.default,
  },
});

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.heading}>
          <Typography variant="h4">{this.props.selectedEvent.name}</Typography>
        </div>
        <div className={classes.subheading}>
          <Typography variant="h5">
            {this.props.selectedContest.name}
          </Typography>
        </div>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            value={this.state.typeOfView}
            exclusive
            onChange={this.handleButtonGroupChange}
          >
            <ToggleButton value="table">Table</ToggleButton>
            <ToggleButton value="byCouple">By Couple</ToggleButton>
            <ToggleButton value="byJudge">By Judge</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {this.state.typeOfView === "table" && <p>TableView</p>}
        {this.state.typeOfView === "byCouple" && <p>byCouple</p>}
        {this.state.typeOfView === "byJudge" && <p>byJudge</p>}

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
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

ViewResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ViewResults));

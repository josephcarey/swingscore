import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  // ExpansionPanelActions,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import NavbarSpacer from "../NavbarSpacer/NavbarSpacer";
import TestDnD from "../TestDnD/TestDnD";

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    margin: 22,
  },
});

class PickContestPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_CONTEST_DETAILS" });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavbarSpacer />
        <Typography
          variant="h4"
          as="h1"
          color="inherit"
          className={classes.heading}
        >
          Roster
        </Typography>
        <Typography
          variant="h5"
          as="h1"
          color="inherit"
          className={classes.heading}
        >
          Leads
        </Typography>
        <Typography
          variant="h5"
          as="h1"
          color="inherit"
          className={classes.heading}
        >
          Follows
        </Typography>
        <Typography
          variant="h5"
          as="h1"
          color="inherit"
          className={classes.heading}
        >
          Roster
        </Typography>
        <TestDnD />

        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  contest: state.contest,
  eventList: state.eventList,
});

PickContestPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(withStyles(styles)(PickContestPage));
export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(PickContestPage))
);

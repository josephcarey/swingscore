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
  // componentDidMount() {

  // }

  selectContest = contestClicked => {
    this.props.dispatch({
      type: "SET_CONTEST",
      payload: contestClicked,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant="h4"
          as="h1"
          color="inherit"
          className={classes.heading}
        >
          Events
        </Typography>
        {this.props.eventList.map(event => {
          return (
            <ExpansionPanel key={event.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                {/* <Avatar>
                  <ImageIcon />
                </Avatar> */}
                <Typography variant="h5">{event.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {event.contests.map(contest => {
                    return (
                      <ListItem
                        key={contest.id}
                        button
                        onClick={() => this.selectContest(contest)}
                      >
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                        <ListItemText
                          primary={contest.name}
                          secondary="Cool text could go here"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </ExpansionPanelDetails>
              {/*
              The edit / add stuff could go here
              <ExpansionPanelActions>
                <button>Action</button>
              </ExpansionPanelActions> */}
            </ExpansionPanel>
          );
        })}
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

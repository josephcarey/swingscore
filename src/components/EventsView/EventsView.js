import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class EventsView extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    this.getEvents();
  }
  getEvents = async () => {
    let response = await axios({
      method: "GET",
      url: "/api/event",
    });
    this.setState({
      events: response.data,
    });
  };

  handleClickFor = eventClicked => event => {
    this.props.dispatch({ type: "SET_EVENT", payload: eventClicked });
    this.props.history.push("/contests");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h4" as="h1" color="inherit">
          Events
        </Typography>
        {this.props.eventList.map(event => {
          return (
            <ExpansionPanel key={event.id}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h5"
                  // className={classes.heading}
                >
                  {event.name}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {event.contests.map(contest => {
                    return (
                      <ListItem
                        key={contest.id}
                        button
                        onClick={this.handleClickFor(contest)}
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
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  event: state.event,
  eventList: state.eventList,
});

EventsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(withStyles(styles)(EventsView));
export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(EventsView))
);

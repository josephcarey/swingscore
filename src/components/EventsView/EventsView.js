import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

const styles = theme => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
        <List>
          {this.state.events.map(event => {
            return (
              <ListItem
                key={event.id}
                button
                onClick={this.handleClickFor(event)}
              >
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={event.name}
                  secondary="Cool text could go here"
                />
              </ListItem>
            );
          })}
        </List>
        {JSON.stringify(this.props, null, 2)}
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
});

EventsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(withStyles(styles)(EventsView));
export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(EventsView))
);

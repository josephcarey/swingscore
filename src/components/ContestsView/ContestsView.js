import React, { Component } from "react";
import { connect } from "react-redux";
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

class ContestsView extends Component {
  state = {
    contests: [],
  };

  componentDidMount() {
    this.getContests();
  }

  getContests = async () => {
    let response = await axios({
      method: "GET",
      url: `/api/contest/${this.props.event.id}`,
    });
    this.setState({
      contests: response.data,
    });
  };

  handleClickFor = field => event => {
    console.log(field);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <a href="/home">back to events</a>
        <Typography variant="h4" as="h1" color="inherit">
          {this.props.event.name}
        </Typography>
        <List>
          {this.state.contests.map(contest => {
            return (
              <ListItem
                key={contest.id}
                button
                onClick={this.handleClickFor(contest.id)}
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
        {JSON.stringify(this.state, null, 2)}
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

ContestsView.propTypes = {
  classes: PropTypes.object.isRequired,
};

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(ContestsView));

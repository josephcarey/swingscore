import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import MyBackButton from "../MyBackButton/MyBackButton";
import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyList from "../MyList/MyList";
import MyButton from "../MyButton/MyButton";
import MyCenterButton from "../MyCenterButton/MyCenterButton";

const styles = theme => ({
  myAvatar: {
    borderRadius: 10,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
});

class ViewRoster extends Component {
  state = {};
  componentDidMount() {
    this.getCouples();
  }

  getCouples = () => {
    this.props.dispatch({
      type: "FETCH_CONTEST_COUPLES",
      payload: this.props.selectedContest.id,
    });
    this.props.dispatch({
      type: "FETCH_CONTEST_ROSTER",
      payload: this.props.selectedContest.id,
    });
  };

  handleRandomizeClick = () => {
    this.props.dispatch({
      type: "RANDOMIZE_CONTEST_COUPLES",
      payload: this.props.selectedContest.id,
    });
  };

  handleStartClick = () => {
    this.props.dispatch({
      type: "START_CONTEST",
      payload: this.props.selectedContest.id,
    });

    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: "judge",
    });
  };

  backButton = () => {
    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: "roster",
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MyBackButton onClick={this.backButton}>Back to roster</MyBackButton>
        <MyHeading noTopHeader>{this.props.selectedContest.name}</MyHeading>
        <MySubHeading>Couples</MySubHeading>

        <List>
          {this.props.contestCouples.map((couple, index) => {
            return (
              <ListItem button key={couple.couple_id}>
                <Avatar className={classes.myAvatar}>
                  {index + 1}
                  {/* <ImageIcon /> */}
                </Avatar>
                {/* <Avatar>
            <ImageIcon />
          </Avatar> */}
                <ListItemText
                  primary={
                    couple.lead.username + "\n + " + couple.follow.username
                  }
                  // secondary={
                  //   item.lead.bib_number +
                  //   "\n + " +
                  //   item.follow.bib_number
                  // }
                />
              </ListItem>
            );
          })}
        </List>

        <MyButton onClick={this.handleRandomizeClick}>Randomize</MyButton>

        <MyCenterButton fixed onClick={this.handleStartClick}>
          Start!
        </MyCenterButton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  selectedEvent: state.selectedEvent,
  selectedContest: state.selectedContest,
  contestRoster: state.contestRoster,
  contestCouples: state.contestCouples,
});

ViewRoster.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledViewRoster = withStyles(styles)(ViewRoster);
export default connect(mapStateToProps)(styledViewRoster);

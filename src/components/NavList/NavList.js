import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { List, ListItem, ListItemText } from "@material-ui/core/";

const styles = {
  userDetail: {
    padding: 24,
    width: "100%",
  },
  contestDetail: {
    paddingLeft: 24,
    width: "100%",
  },
  list: {
    width: 240,
  },
};

const NavList = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <List>
        <ListItem
          button
          onClick={() => {
            props.navigateTo("selectEvent");
          }}
        >
          <ListItemText
            primary={
              props.selectedEvent.name
                ? props.selectedEvent.name
                : "No Event Selected"
            }
            secondary="Click to select"
          />
        </ListItem>
        <ListItem
          button
          disabled={!props.selectedEvent.id}
          onClick={() => {
            props.navigateTo("selectContest");
          }}
        >
          <ListItemText
            primary={
              props.selectedContest.name
                ? props.selectedContest.name
                : "No Contest Selected"
            }
            secondary="Click to select"
          />
        </ListItem>
        <ListItem
          button
          disabled={!props.selectedContest.id}
          onClick={() => {
            props.navigateTo("roster");
          }}
        >
          <ListItemText>Roster</ListItemText>
        </ListItem>
        <ListItem
          button
          disabled={!props.selectedContest.id}
          onClick={() => {
            props.navigateTo("couples");
          }}
        >
          <ListItemText>Couples</ListItemText>
        </ListItem>
        <ListItem
          button
          disabled={!props.selectedContest.id}
          onClick={() => {
            props.navigateTo("judge");
          }}
        >
          <ListItemText>Judge</ListItemText>
        </ListItem>
        <ListItem
          button
          disabled={!props.selectedContest.id}
          onClick={() => {
            props.navigateTo("results");
          }}
        >
          <ListItemText>Results</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavList);

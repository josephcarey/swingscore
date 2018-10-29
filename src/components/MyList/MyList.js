import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { List, Typography } from "@material-ui/core";

import MyListItem from "../MyListItem/MyListItem";

const styles = theme => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  heading: {
    padding: 16,
  },
});

const MyList = props => {
  // list is the list
  // select is the function to select
  // heading:
  // headingLarge: true or false

  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.heading}>
        {props.headingLarge ? (
          <Typography variant="h4">{props.heading}</Typography>
        ) : (
          <Typography variant="h6">{props.heading}</Typography>
        )}
      </div>
      <List>
        {props.list.map(listItem => {
          return (
            <MyListItem
              key={listItem.id}
              item={listItem}
              handleClick={props.handleClick}
            />
          );
        })}
      </List>
    </div>
  );
};

MyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyList);

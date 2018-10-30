import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { List } from "@material-ui/core";

import MyListItem from "../MyListItem/MyListItem";

const styles = theme => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
});

const MyList = props => {
  // list is the list
  // handleClick is the function for clicking on an item

  const { classes } = props;
  return (
    <div className={classes.root}>
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

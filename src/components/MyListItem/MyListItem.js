import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Avatar, ListItem, ListItemText } from "@material-ui/core";

// import ImageIcon from "@material-ui/icons/Image";

const styles = theme => ({
  myAvatar: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
});

const MyListItem = props => {
  const { classes } = props;
  return (
    <div>
      <ListItem button onClick={() => props.handleClick(props.item)}>
        <Avatar className={classes.myAvatar}>
          {props.item.initials}
          {/* <ImageIcon /> */}
        </Avatar>
        <ListItemText
          primary={props.item.name}
          // secondary="Cool text could go here"
        />
      </ListItem>
    </div>
  );
};

MyListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyListItem);

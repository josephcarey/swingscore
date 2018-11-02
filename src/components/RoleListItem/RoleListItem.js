import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

const styles = theme => ({
  listItem: {
    width: "100%",
  },
});

const RoleListItem = props => {
  const { classes } = props;
  return (
    <ListItem
      button
      key={props.person.id}
      onClick={props.handleToggle(props.person.id)}
      className={classes.listItem}
    >
      <Avatar>
        <ImageIcon />
      </Avatar>
      <ListItemText primary={props.person.username} />
      <ListItemSecondaryAction>
        <Checkbox
          color={"secondary"}
          onChange={props.handleToggle(props.person.id)}
          checked={props.person.isRole}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

RoleListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoleListItem);

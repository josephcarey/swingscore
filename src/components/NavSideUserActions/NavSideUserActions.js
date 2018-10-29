import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core/";

import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const styles = {
  list: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  },
};

const NavSideUserActions = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText>Edit User</ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={props.logout}>
          <ListItemText>Log Out</ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
};

NavSideUserActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavSideUserActions);

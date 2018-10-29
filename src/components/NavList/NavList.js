import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core/";

import ImageIcon from "@material-ui/icons/Image";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
    width: 250,
  },
};

const NavList = props => {
  const { classes } = props;
  return (
    <div className={classes.list}>
      <div className={classes.userDetail}>
        <Typography variant="h4">{props.user.username}</Typography>
      </div>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText>
            Select Event
            {/* <NavLink
            to={`/`}
            exact
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Store
          </NavLink> */}
          </ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>
            Select Contest
            {/* <NavLink
              to={`/admin`}
              activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
            >
              Admin
            </NavLink> */}
          </ListItemText>
        </ListItem>
      </List>
      <div className={classes.contestDetail}>
        <Typography variant="overline">Selected:</Typography>
        <Typography variant="h5">
          {props.contest.name ? props.contest.name : "None"}
        </Typography>
      </div>
      <List>
        <ListItem button disabled={!props.contest.id}>
          <ListItemText>
            Roster
            {/* <NavLink
            to={`/cart`}
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Cart
          </NavLink> */}
          </ListItemText>
        </ListItem>
        <ListItem button disabled={!props.contest.id}>
          <ListItemText>
            Judge
            {/* <NavLink
            to={`/cart`}
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Cart
          </NavLink> */}
          </ListItemText>
        </ListItem>
        <ListItem button disabled={!props.contest.id}>
          <ListItemText>
            Results
            {/* <NavLink
            to={`/cart`}
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Cart
          </NavLink> */}
          </ListItemText>
        </ListItem>

        <Divider />
        <ListItem button>
          <ListItemText>
            Edit User
            {/* <NavLink
            to={`/cart`}
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Cart
          </NavLink> */}
          </ListItemText>
          <ListItemSecondaryAction>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button>
          <ListItemText>
            Log Out
            {/* <NavLink
            to={`/cart`}
            activeStyle={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            Cart
          </NavLink> */}
          </ListItemText>
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

NavList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentPage: state.currentPage,
  user: state.user,
  contest: state.contest,
});

export default connect(mapStateToProps)(withStyles(styles)(NavList));

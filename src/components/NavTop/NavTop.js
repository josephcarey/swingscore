import React, { Component } from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core/";
import MenuIcon from "@material-ui/icons/Menu";

import LogOutButton from "../LogOutButton/LogOutButton";
import NavSpacer from "../NavSpacer/NavSpacer";
import NavSide from "../NavSide/NavSide";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavTop extends Component {
  state = {
    sidenavOpen: false,
  };

  setDrawer = open => () => {
    this.setState({
      sidenavOpen: open,
    });
  };

  openDrawer = () => {
    this.setState({
      sidenavOpen: true,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavSpacer />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={() => this.openDrawer(true)}
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            {/* <Link to="/home"> */}
            <Typography variant="h6" color="inherit" className={classes.grow}>
              swingscore
            </Typography>

            {/* </Link> */}
          </Toolbar>
        </AppBar>
        <NavSide open={this.state.sidenavOpen} setDrawer={this.setDrawer} />
        {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            swingscore
          </Typography>
        </Toolbar>
      </AppBar> */}
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

NavTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(NavTop));

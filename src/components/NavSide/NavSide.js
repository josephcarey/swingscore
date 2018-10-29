import React, { Component } from "react";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import NavList from "../NavList/NavList";

class NavSide extends Component {
  render() {
    return (
      <header>
        <SwipeableDrawer
          open={this.props.open}
          onClose={this.props.setDrawer(false)}
          onOpen={this.props.setDrawer(true)}
        >
          <NavList closeDrawer={this.props.setDrawer(false)} />
        </SwipeableDrawer>
      </header>
    );
  }
}

export default NavSide;

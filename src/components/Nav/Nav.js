import React, { Component } from "react";
import { connect } from "react-redux";

import NavTop from "../NavTop/NavTop";
import NavSide from "../NavSide/NavSide";
import NavSideUser from "../NavSideUser/NavSideUser";
import NavList from "../NavList/NavList";
import NavSideUserActions from "../NavSideUserActions/NavSideUserActions";

class Nav extends Component {
  state = {
    sidenavOpen: false,
  };

  setDrawer = open => () => {
    console.log("setDrawer:", open);
    this.setState({
      sidenavOpen: open,
    });
  };

  navigateTo = destination => {
    this.setDrawer(false);

    this.setState({
      sidenavOpen: false,
    });

    console.log("navigateTo");
    this.props.dispatch({
      type: "NAVIGATE_TO",
      payload: destination,
    });
  };

  logout = () => {
    this.setDrawer(false);

    this.setState({
      sidenavOpen: false,
    });
    this.props.dispatch({ type: "LOGOUT" });
  };

  render() {
    return (
      <>
        <NavTop openDrawer={this.setDrawer(true)} />
        <NavSide open={this.state.sidenavOpen} setDrawer={this.setDrawer}>
          <NavSideUser user={this.props.user} />
          <NavList
            navigateTo={this.navigateTo}
            currentPage={this.props.currentPage}
            selectedEvent={this.props.selectedEvent}
            selectedContest={this.props.selectedContest}
          />
          <NavSideUserActions logout={this.logout} />
        </NavSide>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  currentPage: state.currentPage,
  selectedEvent: state.selectedEvent,
  selectedContest: state.selectedContest,
});

export default connect(mapStateToProps)(Nav);

import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Divider, Typography } from "@material-ui/core/";

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
    width: 225,
  },
};

const NavSideUser = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.userDetail}>
        <Typography variant="h4">{props.user.username}</Typography>
      </div>
      <Divider />
    </>
  );
};

NavSideUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavSideUser);

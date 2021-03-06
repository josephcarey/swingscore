import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 4,
    width: "100%",
  },
});

const NavbarSpacer = ({ classes }) => {
  return <div className={classes.root} />;
};

NavbarSpacer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavbarSpacer);

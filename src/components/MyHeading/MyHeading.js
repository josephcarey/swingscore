import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  rootNoTop: {
    // paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
});

const MyHeading = props => {
  const { classes } = props;
  return (
    <div className={props.noTopHeader ? classes.rootNoTop : classes.root}>
      <Typography variant="h4">{props.children}</Typography>
    </div>
  );
};

MyHeading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyHeading);

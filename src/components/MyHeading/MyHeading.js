import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    padding: 16,
  },
});

const MyHeading = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h4">{props.text}</Typography>
    </div>
  );
};

MyHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyHeading);

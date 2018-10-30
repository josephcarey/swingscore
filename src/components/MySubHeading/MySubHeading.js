import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

const MySubHeading = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h6">{props.text}</Typography>
    </div>
  );
};

MySubHeading.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySubHeading);

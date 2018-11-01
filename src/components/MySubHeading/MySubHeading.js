import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
  },
  subheading: {
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

const MySubHeading = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.subheading} variant="h6">
        {props.children}
      </Typography>
    </div>
  );
};

MySubHeading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySubHeading);

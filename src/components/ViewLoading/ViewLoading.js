import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core/";

const styles = theme => ({
  root: {
    width: "100%",
    position: "relative",
  },
  centerTop: {
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  center: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const ViewLoading = ({ classes }) => {
  return (
    <div>
      <div className={classes.centerTop}>
        <Typography variant="h6">Loading...</Typography>
      </div>
      <div className={classes.center}>
        <CircularProgress className={classes.progress} size={60} />
      </div>
    </div>
  );
};

ViewLoading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewLoading);

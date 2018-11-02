import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

const styles = theme => ({
  spacer: {
    width: "100%",
    height: theme.spacing.unit * 5,
  },
  centerButtonFixed: {
    position: "fixed",
    left: "50%",
    bottom: theme.spacing.unit * 2,
    transform: `translate(-50%, 0%)`,
    width: "85%",
  },
  centerButtonRelative: {
    position: "relative",
    left: "50%",
    bottom: theme.spacing.unit * 2,
    transform: `translate(-50%, 0%)`,
    width: "85%",
  },
});

const MyCenterButton = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.spacer} />
      <Button
        variant="contained"
        color="secondary"
        disabled={props.disabled}
        onClick={props.onClick}
        className={
          props.fixed ? classes.centerButtonFixed : classes.centerButtonRelative
        }
      >
        {props.children}
      </Button>
    </>
  );
};

MyCenterButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCenterButton);

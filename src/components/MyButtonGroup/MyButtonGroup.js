import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab/";

const styles = theme => ({
  toggleContainer: {
    height: 56,
    // padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    background: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
});

const MyButtonGroup = props => {
  const { classes } = props;
  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={props.value}
        exclusive
        onChange={props.onChange}
      >
        {props.buttons.map((button, index) => {
          return (
            <ToggleButton key={index} value={button.value}>
              {button.text}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};

MyButtonGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyButtonGroup);

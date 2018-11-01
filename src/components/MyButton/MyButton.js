import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 0,
    marginBottom: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
});

const MyButton = props => {
  const { classes } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={props.onClick}
      className={classes.button}
    >
      {props.children}
    </Button>
  );
};

MyButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyButton);

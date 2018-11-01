import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MyButton from "../MyButton/MyButton";

const styles = theme => ({
  paper: {
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    position: "absolute",
    width: "85vw",
    // minWidth: "80vw",
    // width: theme.spacing.unit * 50,
    height: "80vh",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ModalStandard extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.props.onOpen && this.props.onOpen();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.onClose && this.props.onClose();
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MyButton onClick={this.handleOpen}>{this.props.buttonText}</MyButton>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className={classes.paper}>{this.props.children}</div>
        </Modal>
      </div>
    );
  }
}

ModalStandard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalStandard);

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import {
  Avatar,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Modal,
} from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

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
  listItem: {
    width: "100%",
  },
});

class ModalAddLead extends React.Component {
  state = {
    open: false,
    people: [],
  };

  componentDidMount() {
    let role = "lead";
    let contest_id = 1;

    axios({
      method: "GET",
      url: `/api/person/role/${contest_id}&${role}`,
    })
      .then(response => {
        console.log(response);
        this.setState({
          people: response.data,
        });
      })
      .catch(error => {
        alert("Something went wrong getting the couples from the server.");
        console.log(error);
      });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });

    let toSend = this.state.people.filter(person => person.isRole);

    let role = "lead";
    let contest_id = 1;

    axios({
      method: "POST",
      url: `/api/person/role/${contest_id}&${role}`,
      data: toSend,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        alert("Something went wrong sending the leads to the server.");
        console.log(error);
      });
  };

  handleToggle = idToSwap => () => {
    let newPeople = this.state.people.map(person => {
      if (person.id === idToSwap) {
        return { ...person, isRole: !person.isRole };
      } else {
        return person;
      }
    });

    this.setState({
      people: newPeople,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen}>Add Lead</Button>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className={classes.paper}>
            <List dense>
              {this.state.people.map((person, index) => {
                return (
                  <ListItem
                    button
                    key={person.id}
                    onClick={this.handleToggle(person.id)}
                    className={classes.listItem}
                  >
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText
                      primary={person.username}
                      // secondary="Cool text"
                    />
                    <ListItemSecondaryAction>
                      <Checkbox
                        color={"primary"}
                        onChange={this.handleToggle(person.id)}
                        checked={person.isRole}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Modal>
      </div>
    );
  }
}

ModalAddLead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalAddLead);

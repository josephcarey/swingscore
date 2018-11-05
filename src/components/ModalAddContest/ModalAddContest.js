import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { TextField } from "@material-ui/core/";

import ModalSmall from "../ModalSmall/ModalSmall";
import MySubHeading from "../MySubHeading/MySubHeading";
import RoleList from "../RoleList/RoleList";

class ModalAddToRole extends React.Component {
  state = {
    newContestName: "",
    newContestInitials: "",
    open: false,
    people: [],
  };

  componentDidMount() {}

  submitUpdated = () => {
    let toSend = {
      name: this.state.newContestName,
      initials: this.state.newContestInitials,
      event_id: this.props.selectedEvent.id,
    };
    console.log("toSend:", toSend);
    axios({
      method: "POST",
      url: `/api/contest/`,
      data: toSend,
    })
      .then(response => {
        this.props.onClose();
      })
      .catch(error => {
        alert("Something went wrong sending the leads to the server.");
        console.log(error);
      });
  };

  handleInputChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    return (
      <>
        <div>
          <ModalSmall
            buttonText={this.props.buttonText}
            onOpen={this.getList}
            onClose={this.submitUpdated}
          >
            <MySubHeading>{this.props.buttonText}</MySubHeading>
            <TextField
              label="Contest Name"
              // type="password"
              // className={classes.textField}
              value={this.state.newContestName}
              onChange={this.handleInputChange("newContestName")}
              margin="normal"
            />
            <TextField
              label="Contest Initials"
              // type="password"
              // className={classes.textField}
              value={this.state.newContestInitials}
              onChange={this.handleInputChange("newContestInitials")}
              margin="normal"
            />
          </ModalSmall>
        </div>
      </>
    );
  }
}

ModalAddToRole.propTypes = {
  contest_id: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
};

export default ModalAddToRole;

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import ModalStandard from "../ModalStandard/ModalStandard";
import MySubHeading from "../MySubHeading/MySubHeading";
import RoleList from "../RoleList/RoleList";

class ModalAddToRole extends React.Component {
  state = {
    open: false,
    people: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    axios({
      method: "GET",
      url: `/api/person/role/${this.props.contest_id}&${this.props.role}`,
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
  };

  submitUpdated = () => {
    let toSend = this.state.people.filter(person => person.isRole);
    axios({
      method: "POST",
      url: `/api/person/role/${this.props.contest_id}&${this.props.role}`,
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
    return (
      <>
        <div>
          <ModalStandard
            buttonText={this.props.buttonText}
            onOpen={this.getList}
            onClose={this.submitUpdated}
          >
            <MySubHeading>{this.props.buttonText}</MySubHeading>
            <RoleList
              people={this.state.people}
              handleToggle={this.handleToggle}
            />
          </ModalStandard>
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

import React, { Component } from "react";
import { connect } from "react-redux";

import { TextField, Typography } from "@material-ui/core/";

import NavSpacer from "../NavSpacer/NavSpacer";
import MyHeading from "../MyHeading/MyHeading";
import MySubHeading from "../MySubHeading/MySubHeading";
import MyButton from "../MyButton/MyButton";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
  };

  login = event => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  handleInputChangeFor = propertyName => event => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <NavSpacer />
        <NavSpacer />
        <NavSpacer />

        <Typography variant="h4" align="center">
          Log In
        </Typography>
        {this.props.errors.loginMessage && (
          <MySubHeading align="center">
            {this.props.errors.loginMessage}
          </MySubHeading>
        )}
        <form onSubmit={this.login}>
          <div align="center">
            <TextField
              align="center"
              id="standard-name"
              label="Username"
              // className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChangeFor("username")}
              margin="normal"
            />
          </div>
          <div align="center">
            <TextField
              align="center"
              id="standard-name"
              label="Password"
              type="password"
              // className={classes.textField}
              value={this.state.password}
              onChange={this.handleInputChangeFor("password")}
              margin="normal"
            />
          </div>
          {/* <input
            visible="false"
            className="register"
            type="submit"
            name="submit"
            value="Register"
          /> */}
          <center />
        </form>
        <center>
          <NavSpacer />
          <div>
            <MyButton onClick={this.login}>Log In</MyButton>
          </div>

          <MyButton
            onClick={() => {
              this.props.dispatch({ type: "SET_TO_REGISTER_MODE" });
            }}
          >
            Register
          </MyButton>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);

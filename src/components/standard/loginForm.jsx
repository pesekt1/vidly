import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "@hapi/joi";
import Form from "./form";
import auth from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  Joi = require("@hapi/joi");

  schema = {
    username: Joi.string()
      .required()
      .label("User name"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    const { state } = this.props.location;
    console.log(this.props);
    //call the server
    try {
      const { username: email, password } = this.state.data;
      await auth.login(email, password);
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data;
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

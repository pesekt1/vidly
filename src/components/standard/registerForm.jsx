import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  Joi = require("@hapi/joi");

  schema = {
    username: Joi.string()
      .required()
      .label("User name")
      .email({ tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    //call the server
    try {
      const response = await userService.register(this.state.data);
      auth.register(response);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Register form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";

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

  doSubmit() {
    //call the server
    console.log("form submitted");
  }

  render() {
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

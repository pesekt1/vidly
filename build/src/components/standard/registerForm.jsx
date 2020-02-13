import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";

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

  doSubmit() {
    //call the server
    console.log("form submitted");
  }
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

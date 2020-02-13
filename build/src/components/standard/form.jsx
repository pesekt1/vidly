import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  schema = {};

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.data,
      options
    );
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    console.log("validate property");
    console.log(name);
    console.log(value);

    const obj = { [name]: value };
    console.log(obj);
    console.log("schema", this.schema);
    const propertySchema = { [name]: this.schema[name] };
    console.log("property schema", propertySchema);
    const { error } = Joi.object(propertySchema).validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("handle submit and validate");
    const errors = this.validate();
    // if there are no errors we update empty object
    this.setState({ errors: errors || {} });
    if (errors) return; //if there are errors we return before calling the server

    this.doSubmit();
    //call the server
  };

  handleChange = ({ currentTarget: input }) => {
    console.log("handlechange input", input);
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      //if error is gone we need to remove it
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        name={name}
        label={label}
      />
    );
  }

  renderSelect(name, label, options) {
    console.log("render select options", options);
    const { data, errors } = this.state;
    console.log("render select data", data);

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  }
}
export default Form;

import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, options, error, ...rest } = this.props;
    console.log("select render options", options);
    console.log("name", name);
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;

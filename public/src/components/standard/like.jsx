import React, { Component } from "react";

class Like extends Component {
  render() {
    let dynamicClass = "fa fa-heart";
    dynamicClass += this.props.liked ? "" : "-o";
    return <i className={dynamicClass} onClick={this.props.onClick}></i>;
  }
}

export default Like;

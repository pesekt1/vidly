import React, { Component } from "react";

class MoviesForm extends Component {
  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie form {match.params.id}</h1>
        <button
          onClick={() => history.push("/movies")}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    );
  }
}

export default MoviesForm;

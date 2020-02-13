import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const { genres, selectedGenre } = this.props;
    const dynamicClassAllGenres =
      selectedGenre === 0 ? "list-group-item active" : "list-group-item";

    return (
      <ul className="list-group">
        <li
          className={dynamicClassAllGenres}
          onClick={() => this.props.onClick(0)}
        >
          All Genres
        </li>
        {genres.map(g => (
          <li
            key={g._id}
            className={
              selectedGenre === g.name
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => this.props.onClick(g.name)}
          >
            {g.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;

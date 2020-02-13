import React from "react";

const SearchBox = props => {
  const { value, onChange } = props;

  return (
    <input
      name="query"
      value={value}
      onChange={onChange}
      className="form-control mr-sm-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
    />
  );
};

export default SearchBox;

import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, onPageChange, currentPage } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1); // makes array [1,2,3,...]

    if (pages.length === 1) return null;

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;

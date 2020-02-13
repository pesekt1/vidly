import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const { onSort, sortColumn } = this.props;

    let newOrder = "asc";
    if (path === sortColumn.path) {
      newOrder = sortColumn.order === "asc" ? "desc" : "asc";
    }
    onSort({ path: path, order: newOrder });
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              scope="col"
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

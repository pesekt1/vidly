import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <NavLink className="nav-link" to="/customers">
              Customers <span className="sr-only">(current)</span>
            </NavLink>
            <Link className="nav-link" to="/rentals">
              Rentals
            </Link>
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
            {!user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-link" to="/">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

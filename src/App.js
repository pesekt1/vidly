import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NavBar from "./components/standard/navBar";
import ProtectedRoute from "./components/standard/protectedRoute";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import LoginForm from "./components/standard/loginForm";
import RegisterForm from "./components/standard/registerForm";
import MovieForm from "./components/standard/movieForm";
import Logout from "./components/standard/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={user} />
        <div>
          <Switch>
            {/* routes have to be in order from most details to less details or you have to use "exact" keyword */}
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;

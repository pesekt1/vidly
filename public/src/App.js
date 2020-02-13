import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/standard/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import LoginForm from "./components/standard/loginForm";
import RegisterForm from "./components/standard/registerForm";
import MovieForm from "./components/standard/movieForm";
import "./App.css";

function App() {
  // routes have to be in order from most details to less details or you have to use "exact" keyword

  return (
    <main className="container">
      <NavBar />
      <div>
        <Switch>
          {/* <Route path="/movies/new" component={MovieForm} /> */}
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" exact component={Movies} />
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

export default App;

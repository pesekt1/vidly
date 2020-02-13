import React from "react";
import Joi from "@hapi/joi";
import Form from "./form";
import { getGenres } from "../../services/getGenres";
import { getMovie, saveMovie } from "../../services/moviesService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {}
  };
  Joi = require("@hapi/joi");

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.string()
      .required()
      .label("Stock"),
    dailyRentalRate: Joi.string()
      .required()
      .label("Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    console.log("movie form genres", genres);
    this.setState({ genres: genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      console.log("after populate movie in movie form, movieId:", movieId);
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) }); // we add _id property to movie object
    } catch (error) {
      if (error.response && error.response.status >= 404)
        return this.props.history.replace("/not-found");
    } //if its another response.status then the @sentry/browser will take care of handling error
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  // movie form button
  async doSubmit() {
    //call the server
    //data is a movie object
    await saveMovie(this.state.data); // if its new movie, data will be empty object
    this.props.history.push("/movies");
    console.log("form submitted");
  }

  render() {
    return (
      <div>
        <h1>Movie form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

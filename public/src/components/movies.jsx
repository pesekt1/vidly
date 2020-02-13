import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";

import Pagination from "./standard/pagination";
import ListGroup from "./listGroup.jsx";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: 0
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  filterGender(movies) {
    const moviesByGender =
      this.state.selectedGenre === 0
        ? movies
        : movies.filter(movie => movie.genre.name === this.state.selectedGenre);
    return moviesByGender;
  }

  handleDelete = movie => {
    const { movies: allMovies, currentPage, pageSize } = this.state;
    const movies = allMovies.filter(m => m._id !== movie._id);

    const moviesByGender = this.filterGender(movies);
    const paginatedMovies = paginate(moviesByGender, currentPage, pageSize);

    if (paginatedMovies.length === 0 && this.state.currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  handleGenres = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { history } = this.props;
    const { length: movieCount } = this.state.movies;
    const {
      pageSize,
      movies: allMovies,
      currentPage,
      genres,
      sortColumn,
      selectedGenre
    } = this.state;

    if (movieCount === 0) return <p>There are no movies in the database.</p>;

    const moviesByGender = this.filterGender(allMovies);
    const sortedMovies = _.orderBy(
      moviesByGender,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              onClick={this.handleGenres}
              genres={genres}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col">
            <Link to="movies/new" className="btn btn-primary">
              New Movie
            </Link>
            <p>Showing {moviesByGender.length} movies from the database.</p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              sortColumn={sortColumn}
              onSort={this.handleSort}
            />
          </div>
        </div>
        <Pagination
          itemsCount={moviesByGender.length}
          pageSize={pageSize}
          onPageChange={this.handlePagination}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;

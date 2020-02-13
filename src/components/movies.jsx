import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../services/moviesService";
import { getGenres } from "../services/getGenres";
import Pagination from "./standard/pagination";
import ListGroup from "./listGroup.jsx";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable.jsx";
import SearchBox from "./standard/searchBox.jsx";

class Movies extends Component {
  state = {
    search: "",
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: 0
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({ movies: movies, genres: genres });
  }

  filterGender(movies) {
    const moviesByGender =
      this.state.selectedGenre === 0
        ? movies
        : movies.filter(movie => movie.genre.name === this.state.selectedGenre);
    return moviesByGender;
  }

  filterSearch(movies) {
    return movies.filter(m =>
      m.title.toLowerCase().startsWith(this.state.search.toLowerCase())
    );
  }

  handleDelete = async movie => {
    //optimistic operation: first we render chagnes for the user and if there is error we roll-back to original state.
    const originalPosts = this.state.movies;
    const { movies: allMovies, currentPage, pageSize } = this.state;

    const movies = allMovies.filter(m => m._id !== movie._id);

    const moviesByGender = this.filterGender(movies);
    const paginatedMovies = paginate(moviesByGender, currentPage, pageSize);

    if (paginatedMovies.length === 0 && this.state.currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert("movie has already been deleted");

      this.setState({ posts: originalPosts });
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, search: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = ({ currentTarget: search }) => {
    this.setState({ search: search.value });
    if (search.value.length > 0)
      this.setState({ selectedGenre: 0, currentPage: 1 });
  };

  render() {
    const { length: movieCount } = this.state.movies;
    const {
      search,
      pageSize,
      movies: allMovies,
      currentPage,
      genres,
      sortColumn,
      selectedGenre
    } = this.state;

    //if (movieCount === 0) return <p>There are no movies in the database.</p>;

    //now we filter either by gender or by search box
    const selectedMovies = search
      ? this.filterSearch(allMovies)
      : this.filterGender(allMovies);

    const sortedMovies = _.orderBy(
      selectedMovies,
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
            {this.props.user && (
              <Link to="movies/new" className="btn btn-primary">
                New Movie
              </Link>
            )}
            <p>Showing {selectedMovies.length} movies from the database.</p>
            <SearchBox onChange={this.handleSearch} value={this.state.search} />
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
          itemsCount={selectedMovies.length}
          pageSize={pageSize}
          onPageChange={this.handlePagination}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Movies;

import http from "./httpService";

const apiEndpoint = "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(apiEndpoint + "/" + movieId);
}

export function deleteMovie(movie) {
  return http.delete(apiEndpoint + "/" + movie._id);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id; // we have to delete _id property before updating an existing object
    await http.put(apiEndpoint + "/" + movie._id, body); // because we give _id in http so it should not be in the body
  } else {
    await http.post(apiEndpoint, movie);
  }
}

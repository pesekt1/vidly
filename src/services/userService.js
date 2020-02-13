import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  // we have to change user object because in our reg. form we use username property but api expects email
  const standardUser = {};
  standardUser.email = user.username;
  standardUser.name = user.name;
  standardUser.password = user.password;

  return http.post(apiEndpoint, standardUser);
}

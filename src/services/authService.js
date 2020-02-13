import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function register(response) {
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  register,
  getCurrentUser,
  getJwt
};

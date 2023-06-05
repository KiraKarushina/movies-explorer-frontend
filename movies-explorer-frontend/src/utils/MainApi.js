import { backendApiAddress, moviesApiAddress } from "./constants.js";

class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      "Content-type": "application/json",
    };
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  updateProfile({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._handleResponse);
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((response) => {
      return this._handleResponse(response);
    });
  }

  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then(this._handleResponse);
  }
  
  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getMyMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    }).then((response) => {
      return this._handleResponse(response);
    });
  }

  getMovies() {
    return fetch(`${moviesApiAddress}/`).then(this._handleResponse);
  }
}

const api = new Api(backendApiAddress);

export default api;

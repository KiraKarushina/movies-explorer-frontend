import { BACKEND_API_ADRESS, MOVIES_API_ADRESS } from "./constants.js";

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

  updateProfile({ name, email }, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._handleResponse);
  }

  getProfile({_id}, token) {
    return fetch(`${this._url}/users/me`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((response) => {
      return this._handleResponse(response);
    });
  }

  saveMovie(movie, token) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({...movie}),
    }).then(this._handleResponse);
  }
  
  deleteMovie(id, token) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._handleResponse);
  }

  getMyMovies(token) {
    return fetch(`${this._url}/movies`, {
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then((response) => {
      return this._handleResponse(response);
    });
  }

  getMovies() {
    return fetch(`${MOVIES_API_ADRESS}/`).then(this._handleResponse);
  }
}

const api = new Api(BACKEND_API_ADRESS);

export default api;

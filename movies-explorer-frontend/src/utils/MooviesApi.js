import { moviesApiAddress } from "./constants";

class MoviesApi {
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
  
    getMovies() {
      return fetch(this._url, {
        headers: this._headers,
      }).then(this._handleResponse);
    }
  }
  
  export const beatFilmApi = new MoviesApi(moviesApiAddress);
  
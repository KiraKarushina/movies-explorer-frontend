import { backendApiAddress } from "./constants";

class Auth {
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

  register(name, email, password ) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then(this._handleResponse);
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "same-origin",
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then(this._handleResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: "POST",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  authentication(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._handleResponse);
  }
}

const auth = new Auth(backendApiAddress);

export default auth;

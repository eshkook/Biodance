import axios from 'axios';
import Cookies from 'js-cookie';

export function delete_cognito_post() {
  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    method: 'POST',
    credentials: 'include', // Include credentials in the request
    body: JSON.stringify({
      action: 'delete',
    })
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
        });
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      return new Error(error.message || "An error occurred during the delete process.");
    });
}

export function logout_cognito_post() {
  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    method: 'POST',
    credentials: 'include', // Include credentials in the request
    body: JSON.stringify({
      action: 'logout',
    })
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
        });
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      return new Error(error.message || "An error occurred during the logout process.");
    });
}

export function signup_cognito_post({ email, password }) {
  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    method: 'POST',
    body: JSON.stringify({
      action: 'signup',
      email: email,
      password: password,
    })
  })
    .then(response => {
      if (!response.ok) {
        // First, parse the response as JSON
        return response.json().then(err => {
          throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
        });
      }
      return response.json();
    })
    .then(data => {
      // This is your JSON data
      return data;
    })
    .catch(error => {
      return new Error(error.message || "An error occurred during the signup process.");
    });
}

export function confirmation_post({ email, confirmation_code }) {
  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    method: 'POST',
    body: JSON.stringify({
      action: 'confirm',
      email: email,
      confirmation_code: confirmation_code
    })
  })
    .then(response => {
      if (!response.ok) {
        // First, parse the response as JSON
        return response.json().then(err => {
          throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
        });
      }
      return response.json();
    })
    .then(data => {
      // This is your JSON data
      return data;
    })
    .catch(error => {
      return new Error(error.message || "An error occurred during the confirmation process.");
    });
}

export function login_cognito_post({ email, password }) {
  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      action: 'login',
      email: email,
      password: password,
    })
  })
    .then(response => {
      if (!response.ok) {
        // First, parse the response as JSON
        return response.json().then(err => {
          throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
        });
      }
      return response.json();
    })
    .then(data => {
      // This is your JSON data
      return data;
    })
    .catch(error => {
      return new Error(error.message || "An error occurred during the login process.");
    });
}

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

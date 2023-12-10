import axios from 'axios';
import Cookies from 'js-cookie';

export function delete_post() {
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

export function logout_post() {
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

export function signup_post({ email, password }) {
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

// export function login_post({ email, password }) {
//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     credentials: 'include',
//     body: JSON.stringify({
//       action: 'login',
//       email: email,
//       password: password,
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         // First, parse the response as JSON
//         return response.json().then(err => {
//           throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
//         });
//       }
//       return response.json();
//     })
//     .then(data => {
//       // This is your JSON data
//       return data;
//     })
//     .catch(error => {
//       return new Error(error.message || "An error occurred during the login process.");
//     });
// }

export function login_post({ email, password }) {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'login',
    email: email,
    password: password,
  }, {
    withCredentials: true, // Equivalent to 'credentials: include' in fetch
  })
  .then(response => {
    // Axios automatically parses the JSON, so you can directly return response.data
    return response.data;
  })
  .catch(error => {
    // Extract message from server response if available, else use a default message
    const message = error.response && error.response.data && error.response.data.message
      ? "Response not ok. " + error.response.data.message
      : "Response not ok.";
  
    // Consistently throw an error as in the fetch version
    throw new Error(message);
  });  
}

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

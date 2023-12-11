import axios from 'axios';

// export function delete_post() {
//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     credentials: 'include', // Include credentials in the request
//     body: JSON.stringify({
//       action: 'delete',
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         return response.json().then(err => {
//           throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
//         });
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       return new Error(error.message || "An error occurred during the delete process.");
//     });
// }

export function delete_post() {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'delete',
  }, {
    withCredentials: true, 
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    let message
    if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'string') {
      message = error.response.data.message
    } else if (error.response && error.response.data && typeof error.response.data === 'string') {
      message = error.response.data
    } else {
      message = "Something went wrong."
    }
  
    throw new Error(message);
  });  
}

// export function logout_post() {
//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     credentials: 'include', // Include credentials in the request
//     body: JSON.stringify({
//       action: 'logout',
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         return response.json().then(err => {
//           throw new Error((err.message) ? ("Response not ok. " + err.message) : "Response not ok.");
//         });
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       return new Error(error.message || "An error occurred during the logout process.");
//     });
// }

export function logout_post() {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'logout',
  }, {
    withCredentials: true, 
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    let message
    if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'string') {
      message = error.response.data.message
    } else if (error.response && error.response.data && typeof error.response.data === 'string') {
      message = error.response.data
    } else {
      message = "Something went wrong."
    }
  
    throw new Error(message);
  });  
}

// export function signup_post({ email, password }) {
//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     body: JSON.stringify({
//       action: 'signup',
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
//       return new Error(error.message || "An error occurred during the signup process.");
//     });
// }

export function signup_post({ email, password }) {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'signup',
    email: email,
    password: password,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    let message
    if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'string') {
      message = error.response.data.message
    } else if (error.response && error.response.data && typeof error.response.data === 'string') {
      message = error.response.data
    } else {
      message = "Something went wrong."
    }
  
    throw new Error(message);
  });  
}

// export function confirmation_post({ email, confirmation_code }) {
//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     body: JSON.stringify({
//       action: 'confirm',
//       email: email,
//       confirmation_code: confirmation_code
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
//       return new Error(error.message || "An error occurred during the confirmation process.");
//     });
// }

export function confirmation_post({ email, confirmation_code }) {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'confirm',
    email: email,
    confirmation_code: confirmation_code,
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    let message
    if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'string') {
      message = error.response.data.message
    } else if (error.response && error.response.data && typeof error.response.data === 'string') {
      message = error.response.data
    } else {
      message = "Something went wrong."
    }
  
    throw new Error(message);
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
    withCredentials: true, 
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    let message
    if (error.response && error.response.data && error.response.data.message && typeof error.response.data.message === 'string') {
      message = error.response.data.message
    } else if (error.response && error.response.data && typeof error.response.data === 'string') {
      message = error.response.data
    } else {
      message = "Something went wrong."
    }
    // const message = error.response && error.response.data
    //   ? error.response.data
    //   : "Something went wrong.";
  
    throw new Error(message);
  });  
}

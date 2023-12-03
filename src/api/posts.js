import axios from 'axios';
import Cookies from 'js-cookie';

export function delete_cognito_post() {

  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
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
    // headers: {
    //   'Content-Type': 'application/json',
    // },
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
  // console.log('signup_cognito_post called with:', { email, password });

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

// export function signup_cognito_post({ email, password }) {
//   // console.log('signup_cognito_post called with:', { email, password });

//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     // headers: {
//     //     'Content-Type': 'application/json',
//     // },
//     body: JSON.stringify({
//       action: 'signup',
//       email: email,
//       password: password,
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         // If the response is not 2xx, this will be executed
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // This is your JSON data
//       return data;
//     })
//     .catch(error => {
//       // Handle the error
//       throw new Error(error.message);
//     });
// }

export function confirmation_post({ email, confirmation_code }) {
  // console.log('confirmation_post called with:', { email, confirmation_code });

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

// export function confirmation_post({ email, confirmation_code }) {
//   // console.log('confirmation_post called with:', { email, confirmation_code });

//   return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//     method: 'POST',
//     // headers: {
//     //     'Content-Type': 'application/json',
//     // },
//     body: JSON.stringify({
//       action: 'confirm',
//       email: email,
//       confirmation_code: confirmation_code
//     })
//   })
//     .then(response => {
//       if (!response.ok) {
//         // If the response is not 2xx, this will be executed
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // This is your JSON data
//       // console.log('Confirmation response:', data);
//       return data;
//     })
//     .catch(error => {
//       // Handle the error
//       // console.error('Error during confirmation:', error);
//       throw new Error(error.message);
//     });
// }

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

// export function signup_cognito_post({ username, password, hobbies, age }) {
//   return axios
//     .post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
//       email,
//       password,
//       hobbies,
//       age
//      }, //{
//     //   headers: { '???????????': '?????????????' } 
//     // }
//     )
//     .then(res => res.data)
//     .catch(error => {
//       // Propagate the error to react-query
//       throw error.response ? error.response.data : new Error('Network error');
//     });
// }

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export function signup_post({ username, password, hobbies, age }) {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/signup/", {
      username,
      password,
      hobbies,
      age
    }, {
      headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
    })
    .then(res => res.data)
    .catch(error => {
      // Propagate the error to react-query
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function login_post({ username, password }) {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie

  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/login/", {
      username,
      password
    }, {
      headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
    })
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function logout_post() {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  return axios
    .post(
      "https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/logout/",
      {}, // Data payload should be empty for logout
      {
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function delete_post() {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie
  return axios
    .delete( // Changed from .post to .delete
      "https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/delete/",
      {
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function post_response_count(count) {
  const csrfToken = Cookies.get('csrftoken'); // Get the CSRF token from the cookie

  return axios
    .post(
      'https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/getresponsecount/',
      { count },
      {
        headers: csrfToken ? { 'X-CSRFToken': csrfToken } : undefined
      }
    )
    .then(res => res.data)
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

export function get_random() {
  return axios
    .get('https://your-backend-domain.com/api/random/')
    .then(res => parseInt(res.data, 10)) // Parse the response data as an integer
    .catch(error => {
      throw error.response ? error.response.data : new Error('Network error');
    });
}

// export function get_calendar() {
//   return axios
//     .get('https://xk8r88ywm0.execute-api.eu-west-1.amazonaws.com/botox_function')
//     .then(res => res.data)
//     .catch(error => {
//       throw error.response ? error.response.data : new Error('Network error');
//     });
// }

export function get_calendar() {
  return axios
    .get('https://xk8r88ywm0.execute-api.eu-west-1.amazonaws.com/botox_function', {
      headers: {
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': true,
        // 'Origin': 'http://localhost:3000',
        // 'Accept': 'application/json'
      }
    })
    .then(res => res.data)
    .catch(error => {
      // It's better to return a rejected promise here instead of throwing an error
      // to maintain promise chain consistency
      return Promise.reject(error.response ? error.response.data : new Error('Network error'));
    });
}

export function getImage() {
  return axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/image/', { timeout: 5000 })
    .then(res => res.data)
}

export function getPosts() {
  return axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/', { params: { _sort: "title" } }) // sorting by title
    .then(res => res.data)
}

export function getPost(id) {
  return axios.get(`https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/${id}`)
    .then(res => res.data)
    .catch(error => {
      if (error.response && error.response.status === 404) {
        throw new Error("No such post");
      } else {
        throw error;
      }
    });
}

export function createPost({ title, body, userId }) {
  return axios
    .post("https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/posts/", {
      title,
      body,
      userId,  // include userId in the request payload
    })
    .then(res => res.data)
}





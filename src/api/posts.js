import axios from 'axios';
import Cookies from 'js-cookie';

export function signup_cognito_post({ email, password }) {
  console.log('signup_cognito_post called with:', { email, password });

  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
      method: 'POST',
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      body: JSON.stringify({
        action: 'signup',  
        email,
        password,
      })
  })
  .then(response => {
      if (!response.ok) {
          // If the response is not 2xx, this will be executed
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      // This is your JSON data
      return data;
  })
  .catch(error => {
      // Handle the error
      throw new Error(error.message);
  });
}

export function confirmation_post({ email, confirmationCode }) {
  console.log('confirmation_post called with:', { email, confirmationCode });

  return fetch("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
      method: 'POST',
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      body: JSON.stringify({
          action: 'confirm',
          email: email,
          confirmationCode: confirmationCode
      })
  })
  .then(response => {
      if (!response.ok) {
          // If the response is not 2xx, this will be executed
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      // This is your JSON data
      console.log('Confirmation response:', data);
      return data;
  })
  .catch(error => {
      // Handle the error
      console.error('Error during confirmation:', error);
      throw new Error(error.message);
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





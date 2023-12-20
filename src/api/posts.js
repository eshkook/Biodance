import axios from 'axios';

export function reset_password_code_phase_post({ email, confirmation_code, password }) {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'reset_password_code_phase',
    email: email,
    confirmation_code: confirmation_code,
    password: password
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

export function reset_password_email_phase_post({ email }) {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'reset_password_email_phase',
    email: email,
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

export function authenticate_post() {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'authenticate',
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

export function delete_post() {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/backend_function", {
    action: 'delete',
  }, {
    withCredentials: true,
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Credentials": true,
    // }, 
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
  
    throw new Error(message);
  });  
}

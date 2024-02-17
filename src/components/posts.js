import axios from 'axios';

export function chat_post({ user_message, action }) {
  return axios.post("https://xk8r88ywm0.execute-api.eu-west-1.amazonaws.com/botox_function", {
    action: action,
    user_message: user_message
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    let message
    if (error.response?.data?.message && typeof error.response.data.message === 'string') {
      message = error.response.data.message
    } else if (error.response?.data && typeof error.response.data === 'string') {
      message = error.response.data
    } else {
      message = "Something went wrong."
    }
  
    throw new Error(message);
  });  
}
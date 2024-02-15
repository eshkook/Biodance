import axios from 'axios';

export function chat_post({ message }) {
  return axios.post("https://efrq1qlgad.execute-api.eu-west-1.amazonaws.com/botox_function", {
    action: 'message',
    prompt: message
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
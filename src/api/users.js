import axios from "axios"

export function getUsers() {
  return axios
    .get('https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/users/', { params: { _sort: "name" } }) 
    .then(res => res.data)
}

export function getUser(id) {
  return axios.get(`https://v9m2jp3tgz.eu-west-1.awsapprunner.com/api/users/${id}`).then(res => res.data)
}




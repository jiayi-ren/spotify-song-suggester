import axios from 'axios';

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  axios.defaults.withCredentials = true
  return axios.create({
    baseURL: 'http://localhost:5000'
  });
};
import axios from 'axios';

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    },
    baseURL: 'https://spotify-song-api.herokuapp.com'
  });
};
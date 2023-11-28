const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
import axios from 'axios';

const followUnfollow = id => {
  axios.post(`${apiUrl}:1234/api/users/follow/${id}`, {}, {
    withCredentials: true
  })
    .then(response => {
      console.log(response.data.message);
    })
    .catch(error => {
      console.error(error);
    });
};

export default followUnfollow
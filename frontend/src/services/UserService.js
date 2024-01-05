import axios from 'axios';

const API_URL = "http://localhost:8080";

class UserService {
  getJwtToken() {
    return localStorage.getItem('jwt'); // Assuming your JWT is stored in local storage
  }

  getUsers() {
    const jwtToken = this.getJwtToken();
    if (jwtToken) {
      return axios.get(API_URL + '/users', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    } else {
      // Handle the case where the JWT token is not available, e.g., redirect to the login page or show an error message.
      return Promise.reject(new Error('JWT token not found'));
    }
  }

  addUser(newUser) {
    const jwtToken = this.getJwtToken();
    if (jwtToken) {
      return axios.post(API_URL + '/users', newUser, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    } else {
      // Handle the case where the JWT token is not available, e.g., redirect to the login page or show an error message.
      return Promise.reject(new Error('JWT token not found'));
    }
  }
}

export default new UserService();
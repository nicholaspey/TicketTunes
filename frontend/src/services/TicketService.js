import axios from 'axios';

const API_URL = "http://localhost:8080";

class TicketService {
  getJwtToken() {
    return localStorage.getItem('jwt'); // Assuming your JWT is stored in local storage
  }

  getTickets() {
    const jwtToken = this.getJwtToken();
    if (jwtToken) {
      return axios.get(API_URL + '/tickets', {
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

export default new TicketService();
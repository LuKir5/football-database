import axios from 'axios'

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    // async relly needed?
    async login(user) { 
        return axios
        .post(API_URL + 'signin', {
            username: user.username,
            password: user.password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        });
    }
    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            password_repeat: user.password_repeat,
        });
    }
}

export default new AuthService();

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class SupperClubApi {
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${SupperClubApi.token}` };
        const params = (method === 'get')
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    //USER API calls:
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async addUser(userDetails) {
        let res = await this.request(`auth/register`, userDetails, 'post');
        return res.token;
    }

    static async deleteUser(userId) {
        let res = await this.request(`users/${userId}`, {}, 'delete');
        return res.message;
    }

    static async login(loginDetails) {
        let res = await this.request('auth/token', loginDetails, 'post');
        return res.token;
    }
}

export default SupperClubApi;
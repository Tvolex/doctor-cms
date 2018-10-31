const axiosModule = require('axios');
const { API_HOST, API_PORT } = require('../config');

const axios = axiosModule.create({
    //baseURL: `http://${API_HOST}:${API_PORT}`,
    timeout: 60000,
    //headers: {'X-Custom-Header': 'foobar'}
});

module.exports = axios;
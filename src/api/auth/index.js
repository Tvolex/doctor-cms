const express = require('express');
const Router = express.Router();
const axios = require('../../utils/axios');

Router.post('/login', (req, res, next) => {
    const {
        body,
    } = req;

    console.log(`Login session: ${req.sessionID}`);

    axios.post(`/login`, body)
        .then(response => res.send(response.data))
        .catch(error => res
            .status(error.response ? error.response.status : error.status)
            .send(error.response ? error.response.data : error.message));
});

Router.get('/auth', (req, res, next) => {
    console.log(`Auth session: ${req.sessionID}`);
    axios.get(`/auth`)
        .then(response =>
            res.send(response.data))
        .catch(error =>
            res
                .status(error.response ? error.response.status : error.status)
                .send(error.response ? error.response.data : error.message));
});

module.exports = Router;
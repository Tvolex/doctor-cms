const express = require('express');
const Router = express.Router();
const axios = require('../../utils/axios');

Router.get('/user', (req, res, next) => {
    const {
        body,
    } = req;

    axios.post(`/user`, body)
        .then(response => res.send(response.data))
        .catch(error => res
            .status(error.response.status)
            .send(error.response.data));
});

Router.post('/user', (req, res, next) => {
    const {
        body,
    } = req;

    axios.post(`/user`, body)
        .then(response => res.send(response.data))
        .catch(error => res
            .status(error.response.status)
            .send(error.response.data));
});

module.exports = Router;

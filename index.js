'use strict';

const axios = require('axios');

exports.getFoo = (endpoint) => {
    const url = endpoint.url;

    return axios
        .request({
            method: 'POST',
            baseURL: url,
            url: '/foo',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {},
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

import React from 'react'
import axios from 'axios';
import Config from './config';

const {API_URL} = Config

export default  axios.create({
    baseURL: API_URL,
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});



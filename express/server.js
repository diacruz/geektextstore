const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;

const MONGOURL = 'mongodb+srv://eduardo:eduardodally@geektext-ryapa.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');
});


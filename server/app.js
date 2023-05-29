const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const path = require('path');
const mongoose = require('./src/config/db');

const app = express();
app.disable("x-powered-by");

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
  origin: '*'
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,X-HTTP-Method-Override,application/json,multipart/form-data');
  next();
});

const todo = require('./src/modules/todo');

app.use('/api', todo);

app.get('*', (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname + '/src/views/404.html'));
});

module.exports = app;
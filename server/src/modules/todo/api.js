'use strict';

const express = require('express');
const router = express.Router();
const todoController = require('./controller');

router
    .get('/todos', todoController.get)
    .get('/todos/:id', todoController.get)
    .post('/todos', todoController.create)
    .put('/todos/:id', todoController.update)
    .delete('/todos', todoController.delete);
    
module.exports = router;

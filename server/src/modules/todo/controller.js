'use strict';

const todoService = require('./service');

module.exports = {
    get: async (req, res) => {
        try {
            const todo = await todoService.get(req.params);
            res.status(200);
            res.json(todo);
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({ error, message: 'error when fetching a todo' });
        }
    },
    create: async (req, res) => {
        try {
            const todo = req.body;
            const createdTodo = await todoService.create(todo);
            res.status(201);
            res.json(createdTodo);
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({ error, message: 'error when creating a todo' });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const todo = req.body;
            const updatedTodo = await todoService.update(id, todo);
            res.status(200);
            res.json(updatedTodo);
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json({ error, message: 'error when editing a todo' });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedTodo = await todoService.delete(id);
            res.status(200);
            res.json(deletedTodo);
        } catch (e) {
            res.status(400);
            res.json({ deletedTodo: e, message: 'error when deleting a todo' });
        }
    },
};

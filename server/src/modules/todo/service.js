'use strict';

const Todo = require('./model');

module.exports = {
    get: async (query) => {
        try {
            let dbQuery = Todo;
            dbQuery = query.id && query.id.length ? dbQuery.findById(query.id) : dbQuery.find();
            return dbQuery.select('label _id position state').sort({ position: 1 }).exec();
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    create: async (createTodo) => {
        const creatingTodo = new Todo(createTodo);
        return creatingTodo.save();
    },
    update: async (id, updateTodo) => {
        const todoToUpdate = await Todo.findById(id);
        if (todoToUpdate) {
            return Todo.findByIdAndUpdate(id, updateTodo, { new: true });
        }
        return { message: 'todo not found!' };
    },
    delete: async (id) => {
        const todoToDelete = await Todo.findById(id);
        if (todoToDelete) {
            return Todo.findByIdAndDelete(id);
        }
        return { message: 'todo not found!' };
    },
};

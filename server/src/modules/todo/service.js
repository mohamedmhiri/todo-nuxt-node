'use strict';

const Todo = require('./model');

module.exports = {
    get: async (query) => {
        try {
            let dbQuery = Todo;
            dbQuery = query.id && query.id.length ? dbQuery.findById(query.id) : dbQuery.find();
            return dbQuery.select('label _id position isCompleted').sort({ position: 1 }).exec();
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
    delete: async (ids) => {
        const _ids = ids.split(',');
        const todoToDelete = await Todo.find({ _id: { '$in': _ids } });
        if (todoToDelete.length === _ids.length) {
            return Todo.deleteMany({ _id: { '$in': _ids } });
        }
        return { message: 'todos not found!' };
    },
};

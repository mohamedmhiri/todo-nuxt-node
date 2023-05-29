'use strict';

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://leadfox-admin:DnLQVrf7AAnu9nR0@cluster0.raybnbl.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, }
);
mongoose.connection.once('open', console.info.bind(console, 'Connected to MongoDB'));
module.exports = mongoose;

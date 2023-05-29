const http = require('http');
const app = require('./app');

const PORT = 4000;
const port = process.env.PORT || PORT;

app.set('port', port);

const httpServer = http.createServer(app);

httpServer.listen(port);
const Server = require('./models/Server');

const app = new Server();

app.start();

module.exports = app;
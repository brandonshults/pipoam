const express = require('express');
const server = express();

server.use('/static', express.static(__dirname + '/frontend/dist'));
server.get('/', (req, res) => res.sendFile(__dirname + '/frontend/dist/index.html'));

server.listen(process.env.npm_package_config_port, () => {});


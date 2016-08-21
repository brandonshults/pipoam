const express = require('express');
const multiparty = require('multiparty');
const spawnpointsFromDb = require('./backend/spawnpoints-from-db');
const server = express();
const PORT = process.env.npm_package_config_port;

server.use('/static', express.static(__dirname + '/frontend/dist'));
server.post('/load-from-db', loadFromDb);
server.get('/', (req, res) => res.sendFile(__dirname + '/frontend/dist/index.html'));

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


function loadFromDb(req, res, next) {
  new multiparty.Form().parse(req, (err, fields) => {
    if (err) {
      res.status(500).send('Failed to load from the database.');
      next();
    }

    spawnpointsFromDb(fields)
      .then(results => {
        res.json(results)
      })
      .catch(err => {
        res.status(500).send('Failed to load from the database.');
      })
      .then(next);
  })
}


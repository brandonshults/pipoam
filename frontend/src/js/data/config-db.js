import PouchDb from 'pouchdb';
const db = new PouchDb('pipoam');

const configDb = {
  getDocument() {
    return db.get('config').catch(function (err) {
      if (err.name === 'not_found') {
        return {
          _id: 'config',
          apiKey: null,
          location: null
        };
      } else {
        throw err;
      }
    });
  },
  getApiKey() {
    return configDb.getDocument().then(document => document.apiKey);
  },
  setApiKey(apiKey) {
    return configDb.getDocument('config')
      .then(document => db.put(Object.assign({}, document, { apiKey })))
      .then(() => apiKey);
  },
  getLocation() {
    return configDb.getDocument().then(document => document.location);
  },
  setLocation(location) {
    return configDb.getDocument('config')
      .then(document => db.put(Object.assign({}, document, { location })))
      .then(() => location);
  }
};

export default Object.freeze(configDb);

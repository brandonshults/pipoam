import PouchDb from 'pouchdb';
const db = new PouchDb('pipoam');

const pointsDb = {
  getDocument() {
    return db.get('points').catch(function (err) {
      if (err.name === 'not_found') {
        return {
          _id: 'points',
          points: []
        };
      } else {
        throw err;
      }
    });
  },
  getPoints() {
    return pointsDb.getDocument().then(document => document.points);
  },
  setPoints(points) {
    return pointsDb.getDocument('points')
      .then(document => db.put(Object.assign({}, document, { points })))
      .then(() => points);
  }
};

export default Object.freeze(pointsDb);

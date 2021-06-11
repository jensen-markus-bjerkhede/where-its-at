const { Router } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const router = new Router();

const SECRET_KEY = 'secretkey23456';

router.get('/get', async (req, res) => {
  let events = await db.get('events').value();
  res.status(201).send(events);
});

router.get('/getOne', async (req, res) => {
  const id = req.query.id;
  let events = await db.get('events').find({ id: id }).value();
  res.status(200).send(events);
});

router.post('/create', async (req, res) => {
  const artist = req.body.artist;
  const place = req.body.place;
  const date = req.body.date;
  const price = req.body.price;
  const duration = req.body.duration;
  const accessToken = req.headers['authorization'].split(' ')[1];


  jwt.verify(accessToken, SECRET_KEY, async (err, verifiedJwt) => {
    if (!err) {
      if (verifiedJwt.permissions.some(permission => 'create_event' === permission)) {
        let event = await createEvent(artist, place, date, price, duration);
        res.status(201).send(event);
      } else {
        res.status(401).send('Unauthorized');
      }
    } else {
      res.status(403).send('Forbidden');
    }
  });
});

async function createEvent(artist, place, date, price, duration) {
  let event = {
    id: shortid.generate(),
    artist: artist,
    place: place,
    date: date,
    price: price,
    duration: duration
  }
  return db.get('events').push(event).write();
}

module.exports = router;


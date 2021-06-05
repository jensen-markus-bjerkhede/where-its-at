const { Router } = require('express');
const { db } = require('./db');
const  jwt  =  require('jsonwebtoken');
const shortid = require('shortid');

const router = new Router();

const SECRET_KEY = 'secretkey23456';

router.get('/events', async (req, res) => {
  let events = await db.get('events');
  res.status(201).send(events);
});

router.post('/create', async (req, res) => {
  const artist = req.body.artist;
  const place = req.body.place;
  const date = req.body.date;
  const price = req.body.price;
  const accessToken = req.headers['authorization'].split(' ')[1];

  jwt.verify(accessToken, SECRET_KEY, async (err, verifiedJwt) => {
    if(!err){
      if (verifiedJwt.permissions.some(permission => 'create_event' === permission)) {
        let event = await createEvent(artist, place, date, price);
        res.status(201).send(event);
      }
    } else {
      res.status(403).send('Unauthorized');
    }
  });
});

async function createEvent(artist, place, date, price) {
  let event = {
    id: shortid.generate(),
    artist: artist,
    place: place,
    date: date,
    price: price
  }

  return db.get('events').push(event).write();
}

module.exports = router;


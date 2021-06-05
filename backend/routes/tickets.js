const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const { Router } = require('express');
const { db } = require('./db');

const router = new Router();

const SECRET_KEY = 'secretkey23456';

router.put('/verify', async (req, res) => {
  const accessToken = req.headers['authorization'].split(' ')[1];
  jwt.verify(accessToken, SECRET_KEY, async (err, verifiedJwt) => {
    if(!err) {
      const code = req.body.code;
      if (verifiedJwt.permissions.some(permission => 'verify_ticket' === permission)) {
        let ticket = await db
          .get('tickets')
          .find({ code: code, verified: false })
          .value();
        if (ticket) {
          await db.get('tickets')
            .find({code: code})
            .assign({ verified: true })
            .write()
          res.status(200).send(ticket);
        } else {
          res.status(404).send('No unverified ticket found');
        }
      } else {
        res.status(403).send('Forbidden');
      }
    } else {
      res.status(403).send('Unauthorized');
    }
  });


});

router.post('/create', async (req, res) => {
  const ticket = {
    code: shortid.generate(),
    event: req.body.event,
    verified: false
  }

  db.get('tickets').push(ticket).write();
  res.status(201).send(ticket);
});

module.exports = router;

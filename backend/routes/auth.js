const { Router } = require('express');
const { db } = require('./db');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');

const router = new Router();

const SECRET_KEY = 'secretkey23456';

router.post('/register', async (req, res) => {
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;

  await createUser(email, password, role);
  res.status(200).send('Success!');
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user = await db
    .get('users')
    .find({ email: email })
    .value();

  if (!user) {
    return res.status(404).send('User not found!');
  }
  const result = bcrypt.compareSync(password, user.password);
  if (!result) {
    return res.status(401).send('Password not valid!');
  }

  const  expiresIn  =  '1h';
  const  accessToken  =  jwt.sign({ user:  user.email, permissions: user.permissions }, SECRET_KEY, {
    expiresIn:  expiresIn
  });

  jwt.verify(accessToken, 'secretkey23456', (err, verifiedJwt) => {
    if(err){
      res.send(err.message)
    }else{
      res.status(200).send({ "access_token":  accessToken});
    }
  })

});

function createUser(email, password, role) {
  const hashedPassword = bcrypt.hashSync(password);

  let permissions = [];

  if (role === 'admin') {
    permissions = ['create_event', 'verify_ticket']
  }

  if (role === 'staff') {
    permissions = ['verify_ticket']
  }

  let user = {
    email: email,
    password: hashedPassword,
    permissions: permissions
  }

  db.get('users')
    .push(user)
    .write()
}

module.exports = router;

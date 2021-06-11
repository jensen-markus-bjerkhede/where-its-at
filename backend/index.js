const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

const auth = require('./routes/auth');
const events = require('./routes/events');
const tickets = require('./routes/tickets');

app.use('/auth', auth);
app.use('/events', events);
app.use('/tickets', tickets);

app.listen(3000, () => {
    console.log('Server started!')
})

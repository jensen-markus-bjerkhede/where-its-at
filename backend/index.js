const express = require('express');

const auth = require('./routes/auth');
const events = require('./routes/events');
const tickets = require('./routes/tickets');

const app = express();

app.use(express.json());

app.use('/auth', auth);
app.use('/events', events);
app.use('/tickets', tickets);

app.listen(3000, () => {
    console.log('Server started!')
})
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);
const db = require('./config/keys').MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

app.use('/api/users', require('./routes/users.js'));
app.use('/api/permissions', require('./routes/permissions.js'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

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
app.use('/api/company', require('./routes/company.js'));
app.use('/api/permissions', require('./routes/permissions.js'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    );
  });
}

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');
const axios = require('axios');

const User = require('../models/User');

// @route GET api/users/register
// @desc Register User
// @access Public
router.post('/register', (req, res) => {
  const {
    firstname,
    lastname,
    email,
    address,
    phone,
    age,
    password
  } = req.body;
  let errors = [];

  // Check required fields
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !address ||
    !phone ||
    !age
  ) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // Check if password is long enough
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json({
      errors
    });
  } else {
    // Validation passed
    User.findOne({ email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.status(400).json({
          errors
        });
      } else {
        const newUser = new User({
          firstname,
          lastname,
          email,
          password,
          address,
          phone,
          age
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hashed
            newUser.password = hash;

            // Save user
            newUser
              .save()
              .then(user => {
                res.status(201).json(user);
              })
              .catch(err => console.log(err));
          })
        );
      }
    });
  }
});

// @route PUT /api/users
// @desc Update user and send back new jwt
// @access Private
router.put(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { _id } = req.user;
    try {
      console.log(req.body);
      console.log(req.user);
      const user = await User.updateOne({ _id }, req.body);
      const { id, firstname, lastname, email, phone, address, age } = user;
      const payload = {
        id,
        firstname,
        lastname,
        email,
        phone,
        address,
        age
      };
      jwt.sign(
        payload,
        keys.MONGO_SECRET,
        {
          expiresIn: 3600
        },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      );
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error updating user' });
    }
  }
);

// @route GET /api/users/login
// @desc Login user
// @access Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  let errors = {};

  // Find user by email
  User.findOne({
    email
  }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const { id, firstname, lastname, email, phone, address, age } = user;
        const payload = {
          id,
          firstname,
          lastname,
          email,
          phone,
          address,
          age
        };
        jwt.sign(
          payload,
          keys.MONGO_SECRET,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    try {
      await User.deleteOne({ _id: req.user._id });
      res.status(200).json({ removed: 'User removed' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ Error: 'Could not delete user' });
    }
  }
);

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    res.json({ user: req.user });
  }
);

//@route GET /logout
//@desc Logout Handle
//@access Private
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ msg: 'You have been logged out' });
});

//@route GET /:id
//@desc Get user's details (Assuming permissions allow)
//@access Private
router.get(
  '/:pairKey',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    // Get permissions
    const { pairKey } = req.params;
    const params = {
      where: {
        pairKey
      }
    };
    const URLParams = encodeURIComponent(JSON.stringify(params));
    try {
      const permissionsRes = await axios.get(
        `http://localhost:3000/api/Permissions?filter=${URLParams}`
      );

      // Fetch user data
      const user = await User.findOne({ pairKeys: pairKey });

      if (!user) {
        res.status(404).json({ Error: 'No user with that pair key' });
      }

      const { name, email, phone, address, age } = permissionsRes.data[0];
      const userData = {
        name: name ? `${user.firstname} ${user.lastname}` : false,
        email: email ? user.email : false,
        phone: phone ? user.phone : false,
        address: address ? user.address : false,
        age: age ? user.age : false
      };

      res.status(200).json(userData);
    } catch (e) {
      console.log(e);
      res.status(500).json({ Error: 'Error fetching user data' });
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

const Company = require('../models/Company');

// @route GET api/company/register
// @desc Register Company
// @access Public
router.post('/register', (req, res) => {
  const { name, password } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !password) {
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
    Company.findOne({ name }).then(company => {
      if (company) {
        errors.push({ msg: 'Company with that name already registered' });
        res.status(400).json({
          errors
        });
      } else {
        const newCompany = new Company({
          name,
          password
        });

        // Hash Password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            // Set password to hashed
            newCompany.password = hash;

            // Save user
            newCompany
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

// @route PUT /api/company
// @desc Update company
// @access Private
router.put(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    const { _id } = req.user;
    try {
      const user = await Company.updateOne({ _id }, req.body);
      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error updating user' });
    }
  }
);

// @route GET /api/company/login
// @desc Login company
// @access Public
router.post('/login', (req, res) => {
  const { name, password } = req.body;
  let errors = {};

  // Find company by name
  Company.findOne({
    name
  }).then(user => {
    // Check for user
    if (!user) {
      errors.name = 'Company not found';
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, company.password).then(isMatch => {
      if (isMatch) {
        // Company Matched
        const { id, name } = company;
        const payload = {
          id,
          name
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

//@route /api/company
//@desc Delete the company
//@access Private
router.delete(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    try {
      await Company.deleteOne({ _id: req.company._id });
      res.status(200).json({ removed: 'Company removed' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ Error: 'Could not delete user' });
    }
  }
);

// @route GET api/company/current
// @desc Return current company
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

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ msg: 'You have been logged out' });
});

module.exports = router;

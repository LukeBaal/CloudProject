const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const User = require('../models/User');
const passport = require('passport');

//@route POST /api/permissions
//@desc Generate pair key, add pair key to user entry in DB, Post new permissions to hyperledger API
//@access Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.user._id },
        {
          $push: { pairKeys: req.body.pairKey }
        }
      );

      res.status(201).json({ success: 'Pair key added' });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Error trying to post new permissions' });
    }
  }
);

module.exports = router;

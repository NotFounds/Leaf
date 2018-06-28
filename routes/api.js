var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Messages = require('../models').Messages;

router.get('/messages', function(req, res, next) {
  Messages.find().lean().exec((err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json(message);
  })
});

router.post('/message', function(req, res, next) {
  var messages = new Messages();
  messages.text = req.body.text;
  messages.save((err) => {
    if (err) console.log('Registration faild.');
  　if (err) throw err;
  });
  res.send('Success');
});

module.exports = router;


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Enquete = require('../models').Enquete;

router.get('/enquete', function(req, res, next) {
  Enquete.findOne({ key: req.query.key }).lean().exec((err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json(docs);
  });
});

router.post('/enquete', function(req, res, next) {
  Enquete.findOne({ key: req.body.key }).lean().exec((err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    if (docs) {
      res.send('Faild');
    } else {
      var enquete = new Enquete();
      enquete.title     = req.body.title;
      enquete.key       = req.body.key;
      enquete.questions = req.body.questions;
      enquete.save((err) => {
        if (err) {
          console.log('Registration faild.');
          res.send(err);
          return;
        }
        res.send('Success');
      });
    }
  });
});

module.exports = router;


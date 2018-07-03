var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Enquete = require('../models').Enquete;
var Answer  = require('../models').Answer;

router.get('/result', function(req, res, next) {
  Answer.find({ meta: { key: req.query.key } }).lean().exec((err, docs) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json(docs);
  });
});

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

router.post('/answer', function(req, res, next) {
  var answer = new Answer();
  answer.meta.key = req.body.answer.meta.key;
  answer.answers = req.body.answer.answers.slice(0).map(x => (Array.isArray(x) ? x.join(',') : x));
  answer.save((err) => {
    if (err) {
      console.log('Registration faild.');
      res.send(err);
      return;
    }
    res.send('Success');
  });
});

module.exports = router;


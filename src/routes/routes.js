var express = require('express');
var router = express.Router();

const pug = require('pug');

router.get('/', function(req, res, next) {
  res.send({message: 'The documentation should go here.'});
});

router.get('/*', function(req, res, next) {
  res.status(400).send({message: 'Invalid API endpoint'});
});

module.exports = router;
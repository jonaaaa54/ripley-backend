var express = require('express');
var router = express.Router();

const pug = require('pug');

router.get('/', function(req, res, next) {
  res.send(pug.renderFile(__dirname + '../templates/api-index.pug'));
});

router.get('/*', function(req, res, next) {
  res.status(400).send({message: 'Invalid API endpoint'});
});

module.exports = router;
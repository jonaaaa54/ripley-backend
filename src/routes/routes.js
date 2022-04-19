var express = require('express');
var router = express.Router();

var transferenceController = require('../controllers/transference-controller');
var receiverController = require('../controllers/receiver-controller');

router.get('/', function(req, res, next) {
  res.send({message: 'The documentation should go here.'});
});

/** Public access services. */
router.get('/transference', transferenceController.getTransferences);
router.get('/receiver/:rut', receiverController.isReceiver);
router.post('/transference', transferenceController.createTransference);
router.post('/receiver', receiverController.createReceiver);

router.get('/*', function(req, res, next) {
  res.status(400).send({message: 'Invalid API endpoint'});
});

module.exports = router;

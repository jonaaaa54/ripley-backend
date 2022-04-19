var mongoose = require('mongoose');
var Receiver = require('../models/receiver-model');

const isReceiver = async (req, res, next) => {
  try {
    let receiver = await Receiver.find({}).byRut(req.params.rut);
    if (receiver.length == 0) throw new Error('Receiver not found.');

    res.send(
      {
        ok: true,
        message: 'Receiver found.',
        data: receiver[0]
      }
    );

  } catch (err) {
    res.send({
      ok: false,
      message: err.message || 'Error in receiver validation.',
      data: null
    });
  }
};

const createReceiver = async (req, res, next) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    let newReceiver = new Receiver(req.body);

    newReceiver = await newReceiver.save({ session: session });
    res.send({
      ok: true,
      message: 'Receiver created',
      data: newReceiver
    });

    session.commitTransaction();
  } catch (err) {
    session.abortTransaction();
    res.send({
      ok: false,
      message: err.message || 'Error in receiver creation.',
      data: null
    });
  }
};

module.exports = {
  isReceiver, createReceiver
};

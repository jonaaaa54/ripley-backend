var mongoose = require('mongoose');
var Transference = require('../models/transference-model');

const getTransferences = async (req, res, next) => {
  try {
    let transference = await Transference.find();

    if (transference.length == 0) throw new Error('Transference not found.');
    res.send(
      {
        ok: true,
        message: 'Transferences found.',
        data: transference
      }
    );

  } catch (err) {
    res.send({
      ok: false,
      message: err.message || 'Error in transference validation.',
      data: null
    });
  }
};

const createTransference = async (req, res, next) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    let newTransference = new Transference(req.body);
    
    newTransference = await newTransference.save({ session: session });
    res.send({
      ok: true,
      message: 'Transference created',
      data: newTransference[0]
    });

    session.commitTransaction();
  } catch (err) {
    session.abortTransaction();
    res.send({
      ok: false,
      message: err.message || 'Error in Transference creation.',
      data: null
    });
  }
};

module.exports = {
  getTransferences, createTransference
};


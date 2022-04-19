var mongoose = require("mongoose");
const { Schema } = mongoose;

var Receiver = require('../models/receiver-model');

var transference = new Schema([{
  amount: { type: String, required: true },
  receiver: { type: {
    rut: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    bank: { type: String, required: true },
    accountType: { type: String, required: true },
    accountNumber: { type: String, required: true }
  }, required: true }
}]);

var Transference = mongoose.model("Transference", transference);
module.exports = Transference;

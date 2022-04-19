var mongoose = require("mongoose");
const { Schema } = mongoose;

var receiver = new Schema({
  rut: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  bank: { type: String, required: true },
  accountType: { type: String, required: true },
  accountNumber: { type: String, required: true }
});

/** Helpers */
receiver.query.byRut = function(rut){
  return this.find({ rut: rut });
};

var Receiver = mongoose.model("Receiver", receiver);
module.exports = Receiver;

const mongoose = require("mongoose");

const employeeShemea = mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

const employeeModel = mongoose.model("employee", employeeShemea);

module.exports = employeeModel;

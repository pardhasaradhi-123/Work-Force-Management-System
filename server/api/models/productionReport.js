const mongoose = require("mongoose");

const productionReportSchemea = mongoose.Schema({
  name: { required: true, type: String },
  role: { required: true, type: String },
  hour1Weight: { required: true, type: String },
  hour2Weight: { required: true, type: String },
  hour3Weight: { required: true, type: String },
  hour4Weight: { required: true, type: String },
  hour5Weight: { required: true, type: String },
  hour6Weight: { required: true, type: String },
  hour7Weight: { required: true, type: String },
  hour8Weight: { required: true, type: String },
});

const ProductionReportModel = mongoose.model(
  "productionReport",
  productionReportSchemea
);

module.exports = ProductionReportModel;

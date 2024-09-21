const express = require("express");
const {
  saveProductionReport,
  getAllProductionReport,
} = require("../controllers/productionReportContrlloer");

const productionReportRouter = express.Router();

productionReportRouter.get("/getAll", getAllProductionReport);
productionReportRouter.post("/save", saveProductionReport);

module.exports = productionReportRouter;

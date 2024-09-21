const ProductionReportModel = require("../models/productionReport");

const saveProductionReport = async (req, res) => {
  try {
    const productionReport = await new ProductionReportModel({
      name: req.body.name,
      role: req.body.role,
      hour1Weight: req.body.hour1Weight,
      hour2Weight: req.body.hour2Weight,
      hour3Weight: req.body.hour3Weight,
      hour4Weight: req.body.hour4Weight,
      hour5Weight: req.body.hour5Weight,
      hour6Weight: req.body.hour6Weight,
      hour7Weight: req.body.hour7Weight,
      hour8Weight: req.body.hour8Weight,
    });

    await productionReport.save();

    res.status(201).json({ message: "Created succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

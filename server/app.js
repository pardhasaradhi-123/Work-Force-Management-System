const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const employeeRouter = require("./api/routes/employeeRouter");
const productionReportRouter = require("./api/routes/productionReportRouter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/employee", employeeRouter);
app.use("/production-report", productionReportRouter);

const mongoString = process.env.MONGODB_URL;

const mongoConnection = async () => {
  try {
    await mongoose.connect(mongoString);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};
mongoConnection();

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

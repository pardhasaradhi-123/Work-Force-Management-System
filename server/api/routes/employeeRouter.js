const express = require("express");
const {
  saveEmployee,
  getAllEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const employeeRouter = express.Router();

employeeRouter.get("/getAll", getAllEmployee);
employeeRouter.post("/save", saveEmployee);
employeeRouter.delete("/delete/:id", deleteEmployee);

module.exports = employeeRouter;

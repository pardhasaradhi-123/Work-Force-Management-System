const employeeModel = require("../models/employee");
const bcrypt = require("bcrypt");

const getAllEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.find();
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const saveEmployee = async (req, res) => {
  try {
    const plainPassword = req.body.password;
    const hashPassword = await bcrypt.hash(plainPassword, 10);
    const employee = await new employeeModel({
      name: req.body.name,
      employeeId: req.body.employeeId,
      role: req.body.role,
      phone: req.body.phone,
      email: req.body.email,
      password: hashPassword,
      address: req.body.address,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  const employeeId = { _id: req.params.id };

  const deletedEmployee = await employeeModel.findByIdAndDelete(employeeId);

  if (deletedEmployee) {
    res.status(200).json({ message: "deleted successfully" });
  } else {
    res.status(404).json({ message: "Employee Not Found" });
  }
};

module.exports = { saveEmployee, getAllEmployee, deleteEmployee };

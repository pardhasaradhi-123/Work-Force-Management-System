import React, { useState } from "react";

export default function AddEmployees() {
  const inputFields = [
    {
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Employee ID",
      type: "text",
      placeholder: "Enter your employee ID",
    },
    {
      label: "role",
      type: "select",
      options: [
        "Select Role",
        "CEO",
        "HR",
        "SCM",
        "Accountant",
        "Plant Head",
        "Quality Head",
        "Shift Incharge",
        "Production Worker",
        "CNC Worker",
        "Final Inspector",
      ],
    },
    {
      label: "phone",
      type: "text",
      placeholder: "Enter your phone",
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "password",
      type: "text",
      placeholder: "Enter your password",
    },
    {
      label: "Address",
      type: "textarea",
      placeholder: "Enter your address",
    },
  ];

  // Add all fields to inputState and errors
  const [inputState, setInputState] = useState({
    Name: "",
    "Employee ID": "",
    role: "Select Role",
    phone: "",
    Email: "",
    password: "",
    Address: "",
  });

  const [errors, setErrors] = useState({
    Name: "",
    "Employee ID": "",
    role: "",
    phone: "",
    Email: "",
    password: "",
    Address: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      Name: "",
      "Employee ID": "",
      role: "",
      phone: "",
      Email: "",
      password: "",
      Address: "",
    };

    // Validation logic for each field
    if (!inputState.Name) {
      newErrors.Name = "Name is required";
      valid = false;
    }

    if (!inputState["Employee ID"]) {
      newErrors["Employee ID"] = "Employee ID is required";
      valid = false;
    }

    if (inputState.role === "Select Role") {
      newErrors.role = "Role is required";
      valid = false;
    }

    if (!inputState.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(inputState.phone)) {
      newErrors.phone = "Phone number is invalid";
      valid = false;
    }

    if (!inputState.Email) {
      newErrors.Email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputState.Email)) {
      newErrors.Email = "Email address is invalid";
      valid = false;
    }

    if (!inputState.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (inputState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!inputState.Address) {
      newErrors.Address = "Address is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submit successful", inputState);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-4 w-[600px] rounded-lg shadow-md">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-semibold">Add Employees</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              {inputFields.map((eachInput) => (
                <div key={eachInput.label} className="flex flex-col gap-3 mt-3">
                  <label htmlFor={eachInput.label} className="capitalize">
                    {eachInput.label}
                    <span className="text-red-600">*</span>:
                  </label>
                  {eachInput.type === "select" ? (
                    <select
                      name={eachInput.label}
                      value={inputState[eachInput.label]}
                      onChange={handleChange}
                      className="p-3 outline-none bg-[#f5f5f5] rounded-md"
                    >
                      {eachInput.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : eachInput.type === "textarea" ? (
                    <textarea
                      name={eachInput.label}
                      placeholder={eachInput.placeholder}
                      className={`p-3 outline-none bg-[#f5f5f5] rounded-md h-[100px] resize-none ${
                        errors[eachInput.label] ? "border-red-500 border-2" : ""
                      }`}
                      value={inputState[eachInput.label]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      type={eachInput.type}
                      placeholder={eachInput.placeholder}
                      className={`p-3 outline-none bg-[#f5f5f5] rounded-md ${
                        errors[eachInput.label] ? "border-red-500 border-2" : ""
                      }`}
                      name={eachInput.label}
                      value={inputState[eachInput.label]}
                      onChange={handleChange}
                    />
                  )}
                  {errors[eachInput.label] && (
                    <span className="text-red-500 text-sm">
                      {errors[eachInput.label]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="capitalize font-semibold bg-indigo-500 w-full mt-3 p-2 rounded-md hover:text-white hover:bg-indigo-600"
            >
              add employee
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function AddEmployees() {
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "employeeId",
      label: "Employee ID",
      type: "text",
      placeholder: "Enter your employee ID",
    },
    {
      name: "role",
      label: "Role",
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
      name: "phone",
      label: "Phone",
      type: "text",
      placeholder: "Enter your phone",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Enter your password",
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
      placeholder: "Enter your address",
    },
  ];

  const navigate = useNavigate();

  const [inputState, setInputState] = useState({
    name: "",
    employeeId: "",
    role: "Select Role",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    employeeId: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      employeeId: "",
      role: "",
      phone: "",
      email: "",
      password: "",
      address: "",
    };

    if (!inputState.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!inputState.employeeId) {
      newErrors.employeeId = "Employee ID is required";
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

    if (!inputState.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputState.email)) {
      // Fixed typo
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!inputState.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (inputState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!inputState.address) {
      newErrors.address = "Address is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch("http://localhost:5000/employee/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputState),
        });
        const result = await res.json();
        console.log("Successfully created employee:", result);
        setInputState({
          name: "",
          employeeId: "",
          role: "Select Role",
          phone: "",
          email: "",
          password: "",
          address: "",
        });
        navigate("/admin/employee");
      } catch (error) {
        console.error("Failed to create employee:", error.message);
      }
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-4 w-[600px] rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Add Employees</h1>
          <Link to="/admin/employee">
            <IoClose color="red" size={28} />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            {inputFields.map((eachInput) => (
              <div key={eachInput.name} className="flex flex-col gap-3 mt-3">
                <label htmlFor={eachInput.name} className="capitalize">
                  {eachInput.label}
                  <span className="text-red-600">*</span>:
                </label>
                {eachInput.type === "select" ? (
                  <select
                    name={eachInput.name}
                    value={inputState[eachInput.name]}
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
                    name={eachInput.name}
                    placeholder={eachInput.placeholder}
                    className={`p-3 outline-none bg-[#f5f5f5] rounded-md h-[100px] resize-none ${
                      errors[eachInput.name] ? "border-red-500 border-2" : ""
                    }`}
                    value={inputState[eachInput.name]}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={eachInput.type}
                    placeholder={eachInput.placeholder}
                    className={`p-3 outline-none bg-[#f5f5f5] rounded-md ${
                      errors[eachInput.name] ? "border-red-500 border-2" : ""
                    }`}
                    name={eachInput.name}
                    value={inputState[eachInput.name]}
                    onChange={handleChange}
                  />
                )}
                {errors[eachInput.name] && (
                  <span className="text-red-500 text-sm">
                    {errors[eachInput.name]}
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
  );
}

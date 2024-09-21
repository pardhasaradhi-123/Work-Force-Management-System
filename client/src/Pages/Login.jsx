import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);

  const inputs = [
    { id: 1, label: "email", inputType: "email", placeholder: "Enter Email" },
    {
      id: 2,
      label: "password",
      inputType: "password",
      placeholder: "Enter Password",
    },
  ];

  const navigate = useNavigate();

  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!inputState.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(inputState.email)) {
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
      if (
        inputState.email === "admin@gmail.com" &&
        inputState.password === "admin@123"
      ) {
        toast.success(`sign up successful!`);
        setInputState({
          email: "",
          password: "",
        });
        navigate("/admin");
      } else if (
        inputState.email === "employee@gmail.com" &&
        inputState.password === "employee@123"
      ) {
        toast.success(`sign up successful!`);
        setInputState({
          email: "",
          password: "",
        });
        navigate("/employee");
      } else {
        toast.error(`Invalid Detail!`);
        setInputState({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center bg-indigo-900">
        <div
          className={`max-h-[100vh] bg-white rounded-lg p-5 max-w-[700px] max-sm:p-3 overflow-y-auto`}
        >
          <div className="flex justify-center mb-5 max-sm:mb-3">
            <h1 className={`text-2xl font-bold p-3 text-indigo-600 capitalize`}>
              log in
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            {inputs.map((eachInput) => (
              <div key={eachInput.id} className="flex flex-col gap-3 mt-3 w-96">
                <label
                  htmlFor={eachInput.label}
                  className="font-semibold capitalize"
                >
                  {eachInput.label} <span className="text-red-500">*</span>:
                </label>
                <input
                  type={eachInput.inputType}
                  placeholder={eachInput.placeholder}
                  className={`p-3 outline-none bg-[#f5f5f5] rounded-md ${
                    errors[eachInput.label] ? "border-red-500 border-2" : ""
                  }`}
                  name={eachInput.label}
                  value={inputState[eachInput.label]}
                  onChange={handleChange}
                />

                {errors[eachInput.label] && (
                  <span className="text-red-500 text-sm">
                    {errors[eachInput.label]}
                  </span>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-900 hover:text-white w-full mt-5 p-3 rounded-md uppercase font-semibold"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

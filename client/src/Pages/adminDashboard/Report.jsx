import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);

  const handleBoxClick = (section) => {
    setSelectedSection(section);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (password === "prodection") {
      toast.success(`Access granted to ${selectedSection} section!`);
      setShowPasswordModal(false);
      setAccessGranted(true); // Grant access to the form
    } else {
      toast.error("Invalid password. Please try again.");
    }
    setPassword("");
  };

  const handleCloseForm = () => {
    setAccessGranted(false);
  };

  const handleSubmitForm = () => {
    toast.success("Form submitted successfully!");
    handleCloseForm(); // Close the form after submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 bg-white shadow-xl rounded-lg w-full max-w-4xl">
        {/* Production */}
        <div
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 w-full h-32 rounded-lg flex flex-col justify-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleBoxClick("Production")}
        >
          <span className="text-white text-xl font-bold">Production</span>
        </div>
        {/* Quality */}
        <div
          className="bg-gradient-to-r from-red-400 to-red-500 w-full h-32 rounded-lg flex flex-col justify-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleBoxClick("Quality")}
        >
          <span className="text-white text-xl font-bold">Quality</span>
        </div>
        {/* SCM */}
        <div
          className="bg-gradient-to-r from-green-400 to-green-500 w-full h-32 rounded-lg flex flex-col justify-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleBoxClick("SCM")}
        >
          <span className="text-white text-xl font-bold">SCM</span>
        </div>
        {/* Accounts */}
        <div
          className="bg-gradient-to-r from-blue-400 to-blue-500 w-full h-32 rounded-lg flex flex-col justify-center items-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          onClick={() => handleBoxClick("Accounts")}
        >
          <span className="text-white text-xl font-bold">Accounts</span>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowPasswordModal(false)}
            >
              X
            </button>
            <h2 className="text-lg mb-4">Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg bg-blue-100"
              placeholder="Enter password"
            />
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Form (if access granted) */}
      {accessGranted && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative">
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={handleCloseForm}
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Performance Report</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Name field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Name :
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select a name</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>

              {/* Designation field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Designation :
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select a designation</option>
                  <option value="Production Worker">Production Worker</option>
                  <option value="CNC Worker">CNC Worker</option>
                </select>
              </div>

              {/* Hourly weights */}
              {[...Array(8)].map((_, i) => (
                <div className="mb-4" key={i}>
                  <label className="block text-gray-700 font-semibold">
                    Hour {i + 1} Weight :
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder={`Weight ${i + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4"
              onClick={handleSubmitForm}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Report;

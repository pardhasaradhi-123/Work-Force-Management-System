import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const Report = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [specialFormAccess, setSpecialFormAccess] = useState(false);
  const [scmFormAccess, setScmFormAccess] = useState(false);
  const [accountantFormAccess, setAccountantFormAccess] = useState(false); // New state for Accountant form

  const handleBoxClick = (section) => {
    setSelectedSection(section);
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    if (password === "12345") {
      toast.success(`Access granted to ${selectedSection} section!`);
      setShowPasswordModal(false);
      setAccessGranted(true); // Grant access to the default form
    } else if (password === "54321") {
      toast.success("Special form access granted!");
      setShowPasswordModal(false);
      setSpecialFormAccess(true); // Grant access to the special form
    } else if (password === "67890") {
      toast.success("SCM form access granted!");
      setShowPasswordModal(false);
      setScmFormAccess(true); // Grant access to SCM form
    } else if (password === "09876") {
      toast.success("Accountant form access granted!");
      setShowPasswordModal(false);
      setAccountantFormAccess(true); // Grant access to Accountant form
    } else {
      toast.error("Invalid password. Please try again.");
    }
    setPassword("");
  };

  const handleCloseForm = () => {
    setAccessGranted(false);
    setSpecialFormAccess(false);
    setScmFormAccess(false);
    setAccountantFormAccess(false); // Close Accountant form
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
              <IoClose size={28} color="red" />
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
      {/* Default Form (if access granted) */}
      {accessGranted && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative">
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={handleCloseForm}
            >
              <IoClose size={28} color="red" />
            </button>
            <h2 className="text-xl font-bold mb-4">Performance Report</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Name field */}
              <div className="mb-4">
                <label className="block text-gray-700">Name :</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select a name</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>

              {/* Designation field */}
              <div className="mb-4">
                <label className="block text-gray-700">Designation :</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select a designation</option>
                  <option value="Production Worker">Production Worker</option>
                  <option value="CNC Worker">CNC Worker</option>
                </select>
              </div>

              {/* Hourly weights */}
              {[...Array(8)].map((_, i) => (
                <div className="mb-4" key={i}>
                  <label className="block text-gray-700">
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

      {/* Special Form (if special access granted) */}
      {specialFormAccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative"
            style={{ height: "500px", overflowY: "auto" }}
          >
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={handleCloseForm}
            >
              <IoClose size={28} color="red" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              Quality Report - Employee Report
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 mb-4">
                <label className="block text-gray-700">Name :</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select a name</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>

              {/* Hourly Inputs */}
              {[...Array(8)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Hour {i + 1} Weight
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Total Weight Input"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Total Weight Output
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Total Weight Output"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Product</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option value="">Select Product</option>
                      <option value="Product 1">Product 1</option>
                      <option value="Product 2">Product 2</option>
                    </select>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Reset and Submit Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCloseForm}
              >
                Reset
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleSubmitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {/* SCM Form (if password "67890" is entered) */}
      {scmFormAccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative">
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={handleCloseForm}
            >
              <IoClose size={28} color="red" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              Supply Chain Management Form
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Product field */}
              <div className="mb-4">
                <label className="block text-gray-700">Select Product :</label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select Product</option>
                  <option value="Product 1">Product 1</option>
                  <option value="Product 2">Product 2</option>
                </select>
              </div>

              {/* Departure Location */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Departure Location :
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select Departure Location</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                </select>
              </div>

              {/* Destination Location */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Destination Location :
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">Select Destination Location</option>
                  <option value="Destination 1">Destination 1</option>
                  <option value="Destination 2">Destination 2</option>
                </select>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCloseForm}
              >
                Reset
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleSubmitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accountant Form (if password "09876" is entered) */}
      {accountantFormAccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl relative">
            {/* Close Icon */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={handleCloseForm}
            >
              <IoClose size={28} color="red" />
            </button>
            <h2 className="text-xl font-bold mb-4">Accountant Report</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Amount Spent */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Select Amount Spent:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Amount Spent"
                />
              </div>
              {/* Amount Gained */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Select Amount Gained:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Amount Gained"
                />
              </div>
              {/* Tax Paid */}
              <div className="mb-4 col-span-2">
                <label className="block text-gray-700">Tax Paid:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Tax Paid"
                />
              </div>
              {/* Proofs */}
              <div className="mb-4 col-span-2">
                <label className="block text-gray-700">Proofs:</label>
                <input type="file" className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCloseForm}
              >
                Reset
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={handleSubmitForm}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Report;

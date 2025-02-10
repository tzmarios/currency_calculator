import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

const CurrencyModal = ({
  isOpen,
  onClose,
  onSave,
  currency,
  setCurrency,
  title,
  isEditMode = false,
  setSuccessMessage,
}) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      setErrors({});
    }
  }, [isEditMode]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "code") {
      const uppercaseValue = value
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 3);
      setCurrency((prev) => ({ ...prev, [name]: uppercaseValue }));
    } else if (name === "exRate") {
      const positiveNumber = value.replace(/[^0-9.]/g, "");
      setCurrency((prev) => ({ ...prev, [name]: positiveNumber }));
    } else if (name === "name") {
      const lettersAndSpacesOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setCurrency((prev) => ({ ...prev, [name]: value }));
    } else {
      setCurrency((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!currency.name) newErrors.name = "Currency name is required";
    if (!currency.code) newErrors.code = "Currency code is required";
    if (!currency.exRate) newErrors.exRate = "Currency rate is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(currency);
      const message = isEditMode
        ? "Currency updated successfully!"
        : "Currency added successfully!";
      setSuccessMessage(message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-full max-w-lg">
        <Fade>
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Currency Name</label>
              <input
                type="text"
                name="name"
                value={currency.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Currency Code</label>
              <input
                type="text"
                name="code"
                value={currency.code}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.code && (
                <p className="text-red-500 text-sm">{errors.code}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Currency Rate in relation to Euro
              </label>
              <input
                type="text"
                name="exRate"
                value={currency.exRate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.exRate && (
                <p className="text-red-500 text-sm">{errors.exRate}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
              >
                {isEditMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default CurrencyModal;

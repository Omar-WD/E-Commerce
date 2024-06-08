/* eslint-disable react/prop-types */
import  { useState } from "react";

const AddSizeForm = ({ message, onConfirm, onCancel }) => {
  const [newSize, setNewSize] = useState("");
  const [sizeQty, setSizeQty] = useState("");

  const handleConfirm = () => {
    onConfirm(newSize, sizeQty);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p>{message}</p>
        <input
          type="text"
          placeholder="Enter new size"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          className="border p-2 mt-2 w-full"
        />
        <input
          type="number"
          placeholder="Enter quantity"
          value={sizeQty}
          onChange={(e) => setSizeQty(e.target.value)}
          className="border p-2 mt-2 w-full"
        />
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 mr-2">
            Cancel
          </button>
          <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSizeForm;

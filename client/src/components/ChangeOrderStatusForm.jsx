/* eslint-disable react/prop-types */
import  { useContext, useState } from "react";
import { axiosClient } from "../axiosClient";
import { OrderContext } from "../context/OrderProvider";

const ChangeOrderStatusForm = ({ order,orderStatusDisplay, setOrderStatusDisplay }) => {
  const [newStatus, setNewStatus] = useState("");
  const{setOrderStatusChangeCount}=useContext(OrderContext)



  const handleConfirm = () => {
    onConfirm(newStatus);
  };

  const onConfirm = async() => {

    try {
      if (newStatus == order.status) {
        setOrderStatusDisplay("hidden");
        return;
      }
        await axiosClient.patch(`/orders`, {
          status: newStatus,
          orderID: order._id
        });

        setOrderStatusDisplay("hidden");
        setOrderStatusChangeCount(prev=>prev+1)
    }
    catch (error) {
      console.error('handleConfirm -> error', error);
      setOrderStatusDisplay("hidden");
    }
  }
    


  return (
    <div className= {`${orderStatusDisplay} top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}>
      <div className="bg-white p-6 rounded shadow-lg">
        <p>Change Order Status</p>
        <select
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full p-2 mt-4 border border-gray-300 rounded"
          defaultValue={order.status}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        
        <div className="flex justify-end mt-4">
          <button onClick={()=>setOrderStatusDisplay("hidden")} className="bg-red-500 text-white px-4 py-2 mr-2">
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

export default ChangeOrderStatusForm;

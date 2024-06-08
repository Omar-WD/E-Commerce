import { useContext, useRef, useState } from "react";
import { OrderContext } from "../context/OrderProvider";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import ChangeOrderStatusForm from "./ChangeOrderStatusForm";

export default function Order() {
  const { externalOrders } = useContext(OrderContext);
  const orderID = useParams().id;
  const [orderStatusDisplay, setOrderStatusDisplay] = useState("hidden");
  const componentRef = useRef();

  const order = externalOrders.find((order) => order._id === orderID);


  

  if (!order) {
    return <div className="h-[88vh] pt-20 text-center text-2xl">Order not found!</div>;
  }
  
  const orderDate =
    new Date(order.createdAt).getDate() +
    "/" +
    new Date(order.createdAt).getMonth() +
    "/" +
    new Date(order.createdAt).getFullYear() +
    " " +
    new Date(order.createdAt).getHours() +
    ":" +
    new Date(order.createdAt).getMinutes();

  const grossTotal = (
    order && order.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) / 1.11
  ).toFixed(2);

  return (
    <div className="bg-myGray min-h-screen">
      <div className="w-11/12 lg:w-3/4 mx-auto pt-20 pb-6 bg-myGray" ref={componentRef}>
        <div className="orders w-full flex flex-col shadow-gray-900 p-4 shadow-inner">
          <h1 className="text-center text-3xl font-bold pt-10">Invoice</h1>
          <div className="w-full flex flex-col md:flex-row px-5 lg:px-20 pt-8 justify-between">
            <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-start  md:mb-0">
              <h6>Name: {order.user}</h6>
              <h6>Email: {order.email}</h6>
              <h6>Phone: {order.phone}</h6>
              <h6>Address: {order.address}</h6>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col items-start">
              <h6>Date: {orderDate}</h6>
              <h6>ID: {order._id}</h6>
              <h6>Status: {order.status}</h6>
            </div>
          </div>
          <div className="w-full p-4">
            <table className="w-full mt-5">
              <thead>
                <tr>
                  <th className="p-2 md:p-4">Image</th>
                  <th className="p-2 md:p-4">Product</th>
                  <th className="p-2 md:p-4">Quantity</th>
                  <th className="p-2 md:p-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.product._id}>
                    <td className="text-center">
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        className="w-24 h-24 md:w-48 md:h-48 mx-auto"
                      />
                    </td>
                    <td className="p-2 md:p-4 text-center">{item.product.name}{" "}({item.size})</td>
                    <td className="p-2 md:p-4 text-center">{item.quantity}</td>
                    <td className="p-2 md:p-4 text-center">
                      ${item.product.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-right p-2 pt-10">
                    Gross Total:
                  </td>
                  <td colSpan="1" className="text-center p-2 pt-10">
                    ${grossTotal}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-right p-2">
                    VAT (11%):
                  </td>
                  <td colSpan="1" className="text-center p-2">
                    ${(grossTotal * 0.11).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-right p-2">
                    Net Total:
                  </td>
                  <td colSpan="1" className="text-center p-2">
                    ${(grossTotal * 1.11).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-center py-16 md:py-32">
                    Received by:
                  </td>
                  <td colSpan="2" className="text-center py-16 md:py-32">
                    Delivered by:
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full text-center pb-20">
      <ReactToPrint
          trigger={() => (
            <button className="bg-lightGreen text-white w-40 p-2 m-2 hover:bg-lighterGreen hover:border-lightGreen">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
        <button
          onClick={() => setOrderStatusDisplay("fixed")}
          className="bg-lightGreen text-white w-40 p-2 m-2 hover:bg-lighterGreen hover:border-lightGreen"
        >
          Change Status
        </button>
      </div>
      <ChangeOrderStatusForm
        order={order}
        orderID={orderID}
        orderStatusDisplay={orderStatusDisplay}
        setOrderStatusDisplay={setOrderStatusDisplay}
      />
    </div>
  );
}

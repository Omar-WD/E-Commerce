import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderProvider";
import { useNavigate } from "react-router-dom";


export default function OrderList() {
  const { externalOrders } = useContext(OrderContext);
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("all");
  const [orderDate, setOrderDate] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);



  const handleStatusFilter = (e) => {
    setOrderStatus(e.target.value);
  };
  const handleDateFilter = (e) => {
    setOrderDate(e.target.value);
  }
  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  }
 
  useEffect(() => {
    let filteredOrders = externalOrders;
    if (orderStatus !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === orderStatus
      );
    }
    if (orderDate) {
      filteredOrders = filteredOrders.filter(
        (order) => new Date(order.createdAt).toLocaleString(
          "en-US",{
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }) === new Date(orderDate).toLocaleString(
          "en-US",{
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        }) 
      );
    }
    if (sortBy !== "all") {
      const [sortType, sortDirection] = sortBy.split("-");
      if (sortType === "date") {
        filteredOrders.sort((a, b) => {
          if (sortDirection === "Desc") {
            return new Date(a.createdAt) - new Date(b.createdAt);
          } else {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        });
      } else if (sortType === "status") {
        filteredOrders.sort((a, b) => {
          if (sortDirection === "Asc") {
            return a.status.localeCompare(b.status);
          } else {
            return b.status.localeCompare(a.status);
          }
        });
      }
    }
    setFilteredOrders(filteredOrders);
  }, [orderStatus, orderDate, sortBy, externalOrders]);
  


  

  return (
    <div className="orders bg-lighterGray min-h-[88vh] pt-10 sm:pt-20 pb-48">
      <h1 className="text-center text-3xl sm:text-4xl font-bold pb-5 sm:pb-10">Orders</h1>
      <div className="w-[98%] xxs:w-[85%] xs:w-[65%] sm:w-[90%] md:w-2/3 items-left   flex flex-col gap-4 sm:gap-0 sm:flex-row mx-auto bg-yellow-500 text-white font-semibold rounded-2xl p-6 mb-10 sm:mb-20 border-2">
        <div className="flex flex-col gap-2 sm:gap-4 w-1/2">
          <h3>Filter By:</h3>
          <div className=" pl-3 sm:pl-5">
            <div className="pb-2 inline-flex items-center">
              <span className="pr-4 w-28 ">Order Status:</span>
              <select onChange={handleStatusFilter} className="h-8 w-40 px-4 bg-transparent border-[1px] rounded-md shadow-inner shadow-yellow-300  hover:bg-yellow-400 *:bg-dark">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="pb-2 inline-flex justify- items-center">
              <span className="pr-4 w-28 ">Order Date:</span>
              <input onChange={handleDateFilter} type="date" name="" id="" className="h-8 w-40 px-4 bg-transparent border-[1px] rounded-md shadow-inner shadow-yellow-300  hover:bg-yellow-400 *:bg-dark" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 w-1/2">
          <h3>Sort By:</h3>
            <div className="pl-3 sm:pl-5 pb-2 w-full inline-flex justify- items-center">
              <span className="pr-4 w-28">Date/Status:</span>
              <select onChange={handleSortBy} className="h-8 w-40 px-4 bg-transparent border-[1px] rounded-md shadow-inner shadow-yellow-300  hover:bg-yellow-400 *:bg-dark">
                <option value="all">All</option>
                <option value="date-Desc">Date-Desc</option>
                <option value="date-Asc">Date-Asc</option>
                <option value="status-Desc">Status-Desc</option>
                <option value="status-Asc">Status-Asc</option>
              </select>
            </div> 
        </div>
      </div>

      {filteredOrders &&
        filteredOrders.map((order) => {
          const orderDate = new Date(order.createdAt).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // Use 12-hour format
          });

          return (
            <div
              key={order._id}
              className=" w-[80%] xxs:w-[70%] xs:w-[60%] sm:w-[85%] md:w-[65%] lg:w-[50%] max-w-[790px] mx-auto my-6  py-6 flex flex-col sm:flex-row justify-center items-center text-white text-base sm:text-2xl font-semibold bg-lighterGreen rounded-2xl gap-3 sm:gap-6 shadow-2xl hover:bg-dark hover:cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              onClick={() => {
                navigate(`/orders/${order._id}`);
              }}
            >
              <span>{order.user}</span>
              <span>{orderDate}</span>
              <span
                className={`${
                  order.status === "pending"
                    ? "text-yellow-300"
                    : "text-green-300"
                }`}
              >
                ({order.status})
              </span>
            </div>
          );
        })}
    </div>
  );
}

import { useContext } from "react";
import { OrderContext } from "../context/OrderProvider";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductProvider";

export default function SideCart() {
  const {
    order,
    setOrder,
    setDocumentOverflow,
    SideCartDisplay,
    setSideCartDisplay,
    setSideCartIsOppened,
  } = useContext(OrderContext);
  const {products} = useContext(ProductContext);

  const navigate = useNavigate();

  const handleIncrementQty = (index) => {
    const updatedOrder = order.map((orderItem, i) => {
      if (i == index && orderItem.qty < 5 && products.find(product=>product._id===orderItem.productId).sizes.find(size=>size.size==orderItem.selectedSize).qty>orderItem.qty) {
        return { ...orderItem, qty: orderItem.qty + 1 };
      }
      return orderItem;
    });
    setOrder(updatedOrder);
  };

  const handleDecrementQty = (index) => {
    const updatedOrder = order
    .map((orderItem, i) => {
      if (i == index && orderItem.qty > -1) {
        return { ...orderItem, qty: orderItem.qty - 1 };
      }
      return orderItem;
    })
    .filter((orderItem) => orderItem.qty > 0);
    setOrder(updatedOrder);
    if (updatedOrder.length === 0){
      setSideCartDisplay("hidden");
      setDocumentOverflow("auto");
      setSideCartIsOppened(false);
    }
  };
  


  const subTotal=order.reduce((acc,orderItem)=>acc+orderItem.price*orderItem.qty,0)

  return (
    <div
      className={`sideCart ${SideCartDisplay} flex flex-row flex-nowrap bg-opacity-40 bg-black h-[100vh] w-[100vw] top-0 z-50 pointer-events-none`}
    >
      <div
        className=" xs:w-full pointer-events-auto"
        onClick={() => {
          setSideCartDisplay("hidden");
          setDocumentOverflow("auto");
          setSideCartIsOppened(false);
        }}
      ></div>
      <div
        className={` sideCartRight flex flex-col justify-between  bg-white opacity-100 w-full xs:w-[450px] max-w-[530px] min-w-[330px] xs:min-w-[450px]   h-[100vh] text-gray-600 border-l-2 border-gray-500 pointer-events-auto`}
      >
        <div className="w-full">
          <div className=" inline-flex justify-between   items-center  w-full  h-[63px]  text-xl border-b-2">
            <span className=" w-10/12 text-center">Shopping Cart</span>
            <button
            className=" w-2/12 text-center "
              onClick={() => {
                setSideCartDisplay("hidden");
                setDocumentOverflow("auto");
                setSideCartIsOppened(false);
              }}
            >
              X
            </button>
          </div>
          <div className=" w-full flex flex-col mt-4 px-6 max-h-[60vh] overflow-y-auto">
            {order &&
              order.map((orderItem, index) => {
                return (
                  <div
                    key={index}
                    className=" inline-flex w-full h-full gap-2 justify-between items-center py-6 border-b-2 "
                  >
                    <img
                      src={orderItem.img}
                      alt="shoesImg"
                      className=" size-24 aspect-square"
                    />
                    <div className="h-full w-full flex flex-col justify-between gap-4 ">
                      <div className="flex flex-row flex-nowrap justify-between items-center w-full ">
                        <h6 className=" whitespace-break-spaces">{orderItem.name}{" "}({orderItem.selectedSize})</h6>
                        <button onClick={()=>setOrder(
                          order.filter((orderItem,i)=>i!==index)
                        )} className=" text-lightGray border-[2px] rounded-full size-7 hover:text-dark hover:border-dark ">
                          x
                        </button>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full  ">
                        <span className=" inline-flex items-center gap-0 h-full ">
                          <button
                            onClick={() => handleDecrementQty(index)}
                            className="h-full px-4  text-xl border-y-2 border-l-2"
                          >
                            –
                          </button>
                          <span className="h-full px-4 text-xl border-2">
                            {orderItem.qty}
                          </span>
                          <button
                            onClick={() => handleIncrementQty(index)}
                            className="h-full px-4  text-xl border-y-2 border-r-2"
                          >
                            +
                          </button>
                        </span>
                        <span>
                          ${(orderItem.price * orderItem.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="pb-6">
          <div className=" inline-flex w-full justify-between text-lg p-4 mb-10 border-y-2">
            <span>Subtotal :</span>
            <span>${(subTotal).toFixed(2)}</span>
          </div>
          <div className="px-4">
            {/* <button className=" bg-lightGreen text-white w-full h-14 text-lg mb-4 hover:bg-dark hover:ease-in-out duration-500">
              VIEW CART
            </button> */}
            <button onClick={()=>{
                navigate("/checkout")
                setSideCartDisplay("hidden");
                setDocumentOverflow("auto");
                setSideCartIsOppened(false);
            }} className=" bg-lightGreen text-white w-full h-14 text-lg mb-8 hover:bg-dark hover:ease-in-out duration-500">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

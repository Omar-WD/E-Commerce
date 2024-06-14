/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { OrderContext } from "../context/OrderProvider";
import { useNavigate } from "react-router-dom";
export default function ProductQuickView({
  product,
  quickViewDisplay,
  setQuickViewDisplay,
}) {
  const [selectedSize, setSlectedSize] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const { order, setOrder } = useContext(OrderContext);
  const navigate=useNavigate()

  const handleSelectSize = (e) => {
    setSlectedSize(e.target.textContent);
    setDisableButton(false);
  };

  const handleOrderProduct = () => {
    const orderItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      selectedSize: selectedSize,
      img: product.img,
      qty: 1,
    };
    setOrder([...order, orderItem]);
    setQuickViewDisplay("hidden");
    navigate(`/${product.category2.value}`);
  };

 

  return (
    <div
      className={`${quickViewDisplay} flex  items-center top-0 left-0 h-full w-full  bg-black bg-opacity-50 z-50`}
    >
      <div className="pqvDiv   relative  h-[80%] xxs:h-[85%] xs:h-[40%]  sm:h-[50%]  lg:h-[63%]   min-w-80 w-[90%] xxs:w-[75%] xs:w-[90%] md:w-[80%] xl:w-[65%]  mx-auto bg-white opacity-100 rounded-lg ">
        <button
          className=" bg-white h-6 w-6 rounded-full absolute -top-3 -right-3 shadow-sm shadow-black z-40 hover:bg-gray-200 hover:cursor-pointer "
          onClick={() => setQuickViewDisplay("hidden")}
        >
          x
        </button>
        <div className=" flex flex-col pqv  xs:flex-row   w-full h-full ">
          <div className="relative pqrImgDev h-full w-full xs:w-1/2 max-w-[450px] max-h-[450px]  sm:max-w-[1450px]  sm:max-h-[1450px] tall:h-80 tall:w-80   md:w-auto aspect-square ">
            <img src={product.img} alt="shoesImg" className="  h-full  rounded-tr-lg xs:rounded-tr-none rounded-tl-lg xs:rounded-bl-lg " />
            {product.priceBeforeDisc !== 0 && (
              <span className=" absolute text-center m-auto px-1 pt-[9px] h-11 w-11 top-3 left-3 bg-lightGreen text-white rounded-full z-30 ">
                Sale!
              </span>
            )}
          </div>
          <div className="xs:w-1/2 pqrImgDev  md:w-auto text-lightGray flex flex-col py-6  px-4   lg:px-7 items-start gap-4 overflow-y-auto">
            <h5 className="text-sm md:text-lg lg:text-xl">
              {product.category2.value || ""}, {product.category1.value || ""}
            </h5>
            <h2 className=" text-black text-base font-semibold md:text-xl lg:text-2xl xl:text-3xl">{product.name}</h2>
            <h2 className="text-xl lg:text-2xl xl:text-[27.2px] font-semibold">
              {product.priceBeforeDisc !== 0 ? (
                <span className="line-through pr-5 text-[#CBCCCD] font-normal">
                  $
                  {product.priceBeforeDisc &&
                    product.priceBeforeDisc.toFixed(2)}
                </span>
              ) : (
                ""
              )}
              ${product.price.toFixed(2)}{" "}
              <span className="text-sm md:text-[1.1rem] font-normal whitespace-nowrap">& Free Shipping</span>
            </h2>
            <p className="text-base md:text-lg  text-justify pb-6 border-b-[1px] ">
              {product.description}
            </p>
            <div className="w-full inline-flex justify-between ">
              <h6 className="text-sm md:text-lg lg:text-xl font-normal text-[#686d71] ">
                <span className=" text-[#a4aaaf]">Categories: </span>
                {product.category2.value || ""}, {product.category1.value || ""}
              </h6>
              
            </div>

            <div className="flex flex-row flex-wrap gap-2 ">
              {product.sizes.map(
                (size, index) =>
                  size.qty > 0 && (
                    <span
                      key={index}
                      onClick={handleSelectSize}
                      className={` ${
                        size.size == selectedSize
                          ? "bg-black"
                          : "bg-lighterGreen"
                      } 
             
              text-white rounded-md p-1 hover:bg-black hover:cursor-pointer`}
                    >
                      {size.size}
                    </span>
                  )
              )}
            </div>

            <button
              disabled={disableButton}
              onClick={handleOrderProduct}
              className="bg-lighterGreen text-white text-base xs:text-base md:text-lg mt-2 px-20 xs:px-14 sm:px-20 py-2 rounded-lg  hover:bg-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

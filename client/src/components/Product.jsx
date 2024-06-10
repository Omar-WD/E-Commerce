/* eslint-disable react/prop-types */

import { useState } from "react";
import ProductQuickView from "./ProductQuickView"
import { useNavigate } from "react-router-dom";




export default function Product({product}) {
    const [quickViewDisplay, setQuickViewDisplay] = useState("hidden");
    const navigate = useNavigate();
    const handleQuickView = () => {
        setQuickViewDisplay("fixed")
    }
  return (
    <div className="productCard flex flex-col gap-6 items-center pb-6 shadow-md sm:shadow-none">
        <div className="relative">
        {product.priceBeforeDisc !== 0 && <span className=" absolute text-center m-auto px-1 pt-[9px] h-11 w-11 -top-3 -right-3 bg-lightGreen text-white rounded-full z-30">Sale!</span>}
        <div className="productImgContents overflow-hidden lg:min-h-80 ">
            <img src={product.img} onClick={()=>navigate(`/product/${product._id}`)} alt="shoesImg" className="  hover:cursor-pointer hover:scale-[118%]  duration-300 ease-linear " />
            <h5 className="hidden xs:absolute bottom-0 w-full bg-neutral-600 text-white h-9 pt-1 opacity-0 transition-opacity duration-300 ease-in-out " onClick={handleQuickView}>Quick View</h5>
        </div>
        

        </div>
        <div className="flex flex-col gap-2 items-center">
            <h5 className="text-sm  md:text-lg">{product.name}</h5>
            <span>
               { product.priceBeforeDisc !== 0  && <span className="line-through pr-5 text-[#CBCCCD] font-semibold text-sm md:text-lg">${(product.priceBeforeDisc).toFixed(2)}</span> }
                <span className=" text-lightGray font-semibold text-sm md:text-lg">
                    ${(product.price).toFixed(2)}
                </span>
            </span>
            <ProductQuickView product={product} quickViewDisplay={quickViewDisplay} setQuickViewDisplay={setQuickViewDisplay} />
        </div>
    </div>
  )
}

/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderProvider";
import { ProductContext } from "../context/ProductProvider";
import { UserContext } from "../context/UserProvider";
import AddSizeForm from "./AddSizeForm";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../axiosClient";

export default function ProductView({ products }) {
  const { _id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [showAddSizeForm, setShowAddSizeForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const { order, setOrder } = useContext(OrderContext);
  const { setAddSizeCount, handleDeleteProduct } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const product = products.find((product) => product._id === _id);
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleSelectSize = (e) => {
    setSelectedSize(e.target.textContent);
    setDisableButton(false);
    setShowWarning(false);
  };

  const handleOrderProduct = () => {
    if (selectedSize) {
      const orderItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        selectedSize,
        img: product.img,
        qty: 1,
      };
      setOrder([...order, orderItem]);
      setShowWarning(false);
      navigate(`/${product.category2.value}`);
    } else {
      setShowWarning(true);
    }
  };

  const handleConfirmAddSize = async (newSize, sizeQty) => {
    if (newSize && sizeQty) {
      try {
        await axiosClient.put(`/products/update-quantities`, {
          items: [
            {
              productId: product._id,
              sizes: [{ size: Number(newSize), qty: Number(sizeQty) }],
            },
          ],
        });
        if (!product.sizes.some((size) => size.size === newSize)) {
          setAddSizeCount((prev) => prev + 1);
        }
        setShowAddSizeForm(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCancelAddSize = () => {
    setShowAddSizeForm(false);
  };

  const relatedProducts = products.filter(
    (prod) =>
      prod.category1.value === product.category1.value &&
      prod.category2.value === product.category2.value &&
      prod._id !== product._id
  );

  return (
    <div className="mx-0">
      <div className="zzz flex items-center top-0 left-0 h-full w-full mt-10">
        <div className="relative lg:h-[60%] w-[100%] xs:w-[95%] md:w-[90%] lg:w-[80%] mx-auto bg-white py-8 lg:py-16 px-4 lg:px-8 lg:p-16">
          <div className="flex flex-col xs:flex-row flex-wrap w-full h-full">
            <div className="relative h-full w-full xxs:w-11/12 mx-auto xs:w-1/2 aspect-square">
              <img src={product.img} alt="shoesImg" className="h-full" />
              {product.priceBeforeDisc !== 0 && (
                <span className="absolute text-center text-base lg:text-xl m-auto px-1 pt-[12px] lg:pt-[18px] h-12 lg:h-16 w-12 lg:w-16 -top-3 -left-3 bg-lightGreen text-white rounded-full z-30">
                  Sale!
                </span>
              )}
            </div>
            <div className="w-full xxs:w-11/12 mx-auto xs:w-1/2 text-lightGray flex flex-col pl-6 lg:pl-12 pt-10 xs:pt-0 items-start gap-4 overflow-y-auto">
              <div className="w-full inline-flex justify-between items-center">
                <h5 className="text-sm md:text-base lg:text-xl">
                  {product.category2.value || ""}, {product.category1.value || ""}
                </h5>
                {user && (
                  <div className="flex flex-row flex-nowrap items-center justify-center">
                    <FaEdit
                      className="size-12 hover:text-dark hover:cursor-pointer p-3"
                      onClick={() => navigate(`/update-product/${product._id}`)}
                    />
                    <MdDelete
                      className="size-12 hover:text-dark hover:cursor-pointer p-3"
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </div>
                )}
              </div>
              <h2 className="text-black text-xl md:text-2xl lg:text-3xl">
                {product.name}
              </h2>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                {product.priceBeforeDisc !== 0 && (
                  <span className="line-through pr-5 text-[#CBCCCD] font-normal">
                    ${product.priceBeforeDisc.toFixed(2)}
                  </span>
                )}
                ${product.price.toFixed(2)}{" "}
                <span className="text-sm md:text-base lg:text-lg font-normal">
                  & Free Shipping
                </span>
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-justify pb-6 border-b-[1px]">
                {product.description}
              </p>
              <div className="inline-flex w-full justify-between">
                <h5 className="font-normal text-sm md:text-base lg:text-xl text-[#686d71]">
                  <span className="text-[#a4aaaf]">Categories: </span>
                  {product.category2.value || ""}, {product.category1.value || ""}
                </h5>
                {user && (
                  <button
                    className="hover:text-dark text-xl font-bold"
                    onClick={() => setShowAddSizeForm(true)}
                  >
                    + size
                  </button>
                )}
              </div>
              <div className="flex flex-row flex-wrap gap-2">
                {product.sizes.map(
                  (size, index) =>
                    size.qty > 0 && (
                      <span
                        key={index}
                        onClick={handleSelectSize}
                        className={`${
                          size.size == selectedSize
                            ? "bg-black"
                            : "bg-lighterGreen"
                        } text-white text-sm lg:text-base rounded-md p-1 hover:bg-black hover:cursor-pointer`}
                      >
                        {size.size}
                      </span>
                    )
                )}
              </div>
              {showWarning && (
                <div className="text-red-500 text-sm">
                  Please select a size before adding to cart.
                </div>
              )}
              <button
                onClick={handleOrderProduct}
                className="bg-lighterGreen text-white text-base h-6 lg:h-10 w-32 rounded-md mt-1 lg:mt-4 hover:bg-black"
              >
                Add to Cart
              </button>
            </div>
          </div>
          {relatedProducts.length > 0 && (
            <div className="w-full py-20">
              <h1 className="pb-10">Related Products</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-full">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct._id}
                    className="mx-auto w-32 xxs:w-40 xs:w-56 sm:w-64 pb-10 relative hover:cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct._id}`)}
                  >
                    {relatedProduct.priceBeforeDisc !== 0 && (
                      <span className="absolute text-center text-sm xs:text-base m-auto px-1 pt-[10px] xxs:pt-[11px] h-10 xxs:h-11 w-10 xxs:w-11 -top-3 -right-3 bg-lightGreen text-white rounded-full z-50">
                        Sale!
                      </span>
                    )}
                    <div className="w-full pb-4 z-0 overflow-hidden">
                      <img
                        src={relatedProduct.img}
                        alt="shoesImg"
                        className="w-full hover:scale-125 duration-300 ease-linear z-10"
                      />
                    </div>
                    <h4 className="text-xs xxs:text-sm xs:text-base sm:text-lg">
                      {relatedProduct.name}
                    </h4>
                    <h4 className="text-sm xxs:text-base xs:text-lg sm:text-xl">
                      {relatedProduct.priceBeforeDisc && (
                        <span className="pr-2 xs:pr-5 line-through text-lighterGray">
                          ${relatedProduct.priceBeforeDisc.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lightGray">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showAddSizeForm && (
        <AddSizeForm
          message="Enter new size and quantity:"
          onConfirm={handleConfirmAddSize}
          onCancel={handleCancelAddSize}
        />
      )}
    </div>
  );
}
 

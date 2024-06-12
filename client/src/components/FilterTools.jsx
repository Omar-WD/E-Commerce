/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function FilterTools({ filterDispaly, setFilterDispaly }) {
  const location=useLocation()
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
  const [priceRange, setPriceRange] = useState(0);

  const currentLocation = location.pathname;
  
  const productWithoutDeleted = products.filter((product) => product.isDeleted === false);
  useEffect(() => {
    console.log(productWithoutDeleted.length);
  }, [productWithoutDeleted.length]);

  const maxProductPrice =
    productWithoutDeleted.length > 0
      ? productWithoutDeleted.reduce((acc, product) => Math.max(acc, product.price), 0) + 1
      : 0;
  const minProductPrice =
    productWithoutDeleted.length > 0
      ? productWithoutDeleted.reduce(
          (acc, product) => Math.min(acc, product.price),
          Infinity
        )
      : 0;

  useEffect(() => {
    if (productWithoutDeleted.length > 0) {
      setPriceRange(maxProductPrice);
    }
  }, [maxProductPrice, productWithoutDeleted.length]);

  const handlePriceRange = (e) => {
    setPriceRange(e.target.value);
    {currentLocation ? navigate(`${currentLocation}?max_price=${e.target.value}`) : navigate(`/?max_price=${e.target.value}`)}
  };
  const handleResetFilter = () => {
    setPriceRange(maxProductPrice);
    navigate('/')
  };

  const productsCategories1 = productWithoutDeleted
    .map((product) => product.category1.value)
    .filter((value, index, self) => self.indexOf(value) === index);
  const productsCategories2 = productWithoutDeleted
    .map((product) => product.category2.value)
    .filter((value, index, self) => self.indexOf(value) === index);
  const filteredbyPrice = productWithoutDeleted.filter(
    (product) => product.price <= priceRange
  );

  return (
    <div
      className={`${filterDispaly} fixed flex flex-row flex-nowrap bg-opacity-50 bg-black h-[100vh] w-[100vw] top-0 z-50 pointer-events-none`}
    >
      <div
        className={` fixed top-0 left-0 bg-white h-full  w-full xs:w-[400px]  pl-12 pt-0 shadow-2xl pointer-events-auto`}
      >
        <button
          onClick={() => setFilterDispaly("hidden")}
          className=" w-full p-4  text-right text-lightGreen text-3xl hover:text-dark"
        >
          x
        </button>
        
        <div className="flex flex-col w-full gap-4 pr-12">
          <h1 className=" text-2xl sm:text-4xl font-medium font-mono">Filter by price</h1>
          <input
            type="range"
            id="priceRange"
            name="priceRange"
            min={minProductPrice}
            max={maxProductPrice}
            value={priceRange}
            step={1}
            onChange={handlePriceRange}
            className="w-[95%]"
          />
          <label className="w-full text-sm xxs:text-lg" htmlFor="priceRange">
            from{" "}
            <span className="px-2 text-black font-semibold">
              ${minProductPrice.toFixed(2)}
            </span>{" "}
            to{" "}
            <span className="pl-2 pr-4 text-black font-semibold">
              ${priceRange}
            </span>
            <span>
              (
              <span className="text-black font-semibold underline underline-offset-2">
                {filteredbyPrice.length}
              </span>{" "}
              items)
            </span>
          </label>
        </div>

        {filteredbyPrice.length > 0 && (
          <div className="flex flex-col w-full gap-4">
            {filteredbyPrice &&
              productsCategories2.map((category2, index1) => (
                <div
                  key={index1}
                  className="flex flex-col items-start pl-4 gap-2 pt-10"
                >
                  <button onClick={()=>{navigate(`/${category2}/?max_price=${priceRange}`),setFilterDispaly("hidden")}} >
                    {category2}{" "}
                    ({
                      filteredbyPrice.filter(
                        (product) => product.category2.value === category2
                      ).length
                    })
                  </button>
                  {filteredbyPrice &&
                    productsCategories1.map((category1, index2) => (
                      <div
                        key={index2}
                        className="flex flex-col items-start pl-10 "
                      >
                        <button onClick={()=>{navigate(`/${category2}/?max_price=${priceRange}&shoes_type=${category1}`),setFilterDispaly("hidden")}}>
                          {filteredbyPrice.filter(
                            (product) =>
                              product.category1.value === category1 &&
                              product.category2.value ===
                                productsCategories2[index1]
                          ).length > 0
                            ? category1
                            : ""}{" "}
                          {filteredbyPrice.filter(
                            (product) =>
                              product.category1.value === category1 &&
                              product.category2.value ===
                                productsCategories2[index1]
                          ).length > 0
                            ? <span>({filteredbyPrice.filter(
                              (product) =>
                                product.category1.value === category1 &&
                                product.category2.value ===
                                  productsCategories2[index1]
                            ).length})</span>
                            : ""}
                        </button>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        )}
        <button className=" mt-10 w-2/3 h-10 rounded-3xl bg-lightGray shadow-md shadow-black text-white font-semibold hover:bg-black" onClick={handleResetFilter}>Reset Filter</button>
      </div>
    </div>
  );
}

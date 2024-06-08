import { useEffect } from "react";
import { FaLock, FaSyncAlt, FaTruck } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

export default function Footer() {
    const {pathname}=useLocation();
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])
  return (
    <div className=" bg-white">
      <div className=" bg-checkoutFooter text-white flex flex-col justify-center  items-center w-full bg-cover bg-no-repeat h-auto xs:h-[85vh] pt-20 pb-10 bg-center gap-10   ">
        <h1 className=" text-2xl xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold pb-4 xs:pb-0 ">Better for People & the Planet</h1>
        <p className=" text-base xs:text-lg  xl:text-xl px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
          distinctio!
        </p>
        <div className=" flex flex-row justify-around items-center gap-5 xs:gap-10">
          <NavLink to="/men" className="bg-white font-semibold text-black  text-sm xs:text-base h-auto text-center px-1 py-1 xs:py-3 rounded-md hover:bg-black hover:text-white min-w-32 xs:min-w-44">
            SHOP MEN
          </NavLink>
          <NavLink to="/women" className=" bg-white font-semibold text-black text-sm xs:text-base h-auto text-center px-1 py-1 xs:py-3 rounded-md hover:bg-black hover:text-white min-w-32 xs:min-w-44">
            SHOP WOMEN
          </NavLink>
        </div>
      </div>
      <div className=" hidden 2xl:flex flex-row flex-nowrap items-center justify-center h-32 mx-48 border-b-[1px] border-gray-300">
        <h4 className="flex flex-row gap-6 items-center justify-center border-r-[1px] border-gray-400 w-1/3">
          <FaLock /> Secure Payment
        </h4>
        <h4 className="flex flex-row gap-6 items-center justify-center border-r-[1px] border-gray-400 w-1/3">
          <FaTruck /> Express Shipping
        </h4>
        <h4 className="flex flex-row gap-6 items-center justify-center border-r-[1px] w-1/3">
          <FaSyncAlt /> Free Return
        </h4>
      </div>
      <div className=" py-24 hidden md:flex flex-row flex-nowrap px-14 lg:px-28 xl:px-36 2xl:px-48 justify-between items-start">
        <div className=" flex flex-col items-start gap-4">
          <h3 className=" pb-6 font-semibold">E-SHOP</h3>
          <p className=" max-w-60 text-justify break-words text-gray-500 leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            nobis quaerat doloribus corrupti eos excepturi, beatae modi ipsam
            aliquid blanditiis.
          </p>
        </div>
        <div className="  flex flex-col items-start gap-4">
          <h3 className=" pb-6 font-semibold">Shop</h3>
          <h6>
            <NavLink to="/men" className=" text-gray-500 font-medium text-lg hover:text-dark">
              Shop Men
            </NavLink>
          </h6>
          <h6>
            <NavLink to="/women" className=" text-gray-500 font-medium text-lg hover:text-dark">
              Shop Women
            </NavLink>
          </h6>
          <h6>
            <NavLink to="/lookbook" className=" text-gray-500 font-medium text-lg hover:text-dark">
              Lookbook
            </NavLink>
          </h6>
          <h6>
            <NavLink to="/shop" className=" text-gray-500 font-medium text-lg hover:text-dark">
              Collection
            </NavLink>
          </h6>
          <h6>
            <NavLink to="/sale" className=" text-gray-500 font-medium text-lg hover:text-dark">
              Sale
            </NavLink>
          </h6>
        </div>
        <div className="  flex flex-col items-start gap-4">
          <h3 className=" pb-6 font-semibold">About</h3>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Our Story
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Our Materials
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Our Value
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Sustainability
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              {" "}
              Manufacture
            </NavLink>
          </h6>
        </div>
        <div className="flex flex-col items-start gap-4">
          <h3 className=" pb-6 font-semibold">Need help?</h3>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              FAQs
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Shipping & Returns
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Shoe Care
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Size Chart
            </NavLink>
          </h6>
          <h6>
            <NavLink className=" text-gray-500 font-medium text-lg hover:text-dark">
              Contact Us
            </NavLink>
          </h6>
        </div>
      </div>
      <div className=" bg-[#F1F1EF] h-auto  items-center justify-center border-b-2">
        <div className=" flex flex-col xs:flex-row-reverse justify-between items-center w-full px-1">
          <img
            src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/payment-icons.png"
            alt="payment cards"
            className=" h-auto py-4 w-full xs:w-1/2 object-scale-down  border-b-2 xs:border-b-0 border-gray-300"
          />
          <span className=" xs:w-1/2 text-xs sm:text-base py-2 text-center text-gray-400 font-medium font-sans ">
            © 2024 E-SHOP. Powered by <a href="https://omar-wd.github.io/MyPortfolio"  className="text-gray-700 font-bold">Omar Al Zoubi</a>.
          </span>{" "}
        </div>
      </div>
    </div>
  );
}

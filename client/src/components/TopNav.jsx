import { PiBagFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../context/OrderProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { FaBars, FaTimes } from "react-icons/fa";

export default function TopNav() {
  const { order, setDocumentOverflow, setSideCartDisplay } =
    useContext(OrderContext);
  const { user, signout } = useContext(UserContext);
  const [userMenuDisplay, setUserMenuDisplay] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const linkStyle =
    "inline-block text-sm px-4 py-4 font-semibold hover:cursor-pointer hover:duration-1000 hover:ease-out";
  const aLinkStyle =
    "text-lightGray hover:text-black focus:text-dark active:text-dark";

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProfile = () => {
    setUserMenuDisplay(false);
    navigate("/profile");
  };

  const handleSignup = () => {
    setUserMenuDisplay(false);
    navigate("/signup");
  };

  const handleSignout = () => {
    signout();
    setUserMenuDisplay(false);
    navigate("/");
  };

  const toggleBar = () => {
    setIsBarOpen(!isBarOpen);
    setDocumentOverflow(isBarOpen ? "auto" : "hidden");
  };


  return (
    <div className="topNav bg-white flex flex-row justify-between items-center px-0 sm:px-5 lg:px-10 h-[88px]">
      {screenWidth >= 1150 && (
        <>
          <div className="w-4/6 flex flex-row justify-between">
            <a
              href="/"
              className="text-2xl tracking-widest w-1/6 font-serif text-dark whitespace-nowrap py-4 my-auto font-bold hover:cursor-pointer hover:duration-1000 hover:ease-out"
            >
              E - SHOP
            </a>
            <ul className="w-5/6 flex justify-start lg:pl-4 xl:pl-0 items-center">
            
              <li className={linkStyle}>
                <NavLink to="/men" className={aLinkStyle}>
                  MEN
                </NavLink>
              </li>
              <li className={linkStyle}>
                <NavLink to="/women" className={aLinkStyle}>
                  WOMEN
                </NavLink>
              </li>
              <li className={linkStyle}>
                <NavLink to="/shop" className={aLinkStyle}>
                  COLLECTION
                </NavLink>
              </li>
              <li className={linkStyle}>
                <NavLink to="/lookbook" className={aLinkStyle}>
                  LOOKBOOK
                </NavLink>
              </li>
              <li className={linkStyle}>
                <NavLink to="/sale" className={aLinkStyle}>
                  SALE
                </NavLink>
              </li>
              {user && user.role === "admin" && (
                <li className={linkStyle}>
                  <NavLink to="/orders" className={aLinkStyle}>
                    ORDERS
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <ul className="w-2/6 flex flex-row justify-end items-center">
            <li className={linkStyle}>
              <NavLink to="/about" className={aLinkStyle}>
                OUR STORY
              </NavLink>
            </li>
            <li className={linkStyle}>
              <NavLink to="/contact" className={aLinkStyle}>
                CONTACT
              </NavLink>
            </li>
            <li
              className="px-4 text-dark font-semibold w-[92px] h-full"
              onClick={() => {
                setDocumentOverflow("hidden");
                setSideCartDisplay("fixed");
              }}
            >
              <NavLink to="#" className="flex flex-row w-full h-full">
                <PiBagFill className="size-7" />
                <span className="w-5 h-5 leading-5 bg-dark text-sm text-white text-center rounded-full mt-[-14px]">
                  {order.length}
                </span>
              </NavLink>
            </li>
            {user && (
              <div className="relative">
                <li
                  className="relative inline-block px-4 text-dark font-semibold"
                  onClick={() => setUserMenuDisplay(!userMenuDisplay)}
                >
                  <NavLink to="#">
                    <FaUser className="size-5" />
                  </NavLink>
                </li>
                <div
                  className={`absolute top-12 right-0 z-[100] w-40 border border-gray-300 rounded-md shadow-md ${
                    userMenuDisplay ? "block" : "hidden"
                  }`}
                >
                  <ul className="bg-white text-dark text-sm">
                    <>
                      <li
                        className="py-2 px-4 hover:bg-gray-300"
                        onClick={handleProfile}
                      >
                        Profile
                      </li>
                      <li
                        className="py-2 px-4 hover:bg-gray-300"
                        onClick={handleSignup}
                      >
                        Signup
                      </li>
                      <li
                        className="py-2 px-4 hover:bg-gray-300"
                        onClick={handleSignout}
                      >
                        Signout
                      </li>
                    </>
                  </ul>
                </div>
              </div>
            )}
          </ul>
        </>
      )}

      {screenWidth < 1150 && (
        <div className="inline-flex w-screen justify-between px-4 xs:px-8  items-center">
          <FaBars className="size-7" onClick={toggleBar} />
          <a
            href="/"
            className="text-2xl tracking-widest font-serif text-dark whitespace-nowrap py-4 my-auto font-bold hover:cursor-pointer hover:duration-1000 hover:ease-out"
          >
            E - SHOP
          </a>
          <ul className="flex flex-row justify-end items-center">
            <li
              className="text-dark font-semibold h-full"
              onClick={() => {
                setDocumentOverflow("hidden");
                setSideCartDisplay("fixed");
              }}
            >
              <NavLink to="#" className="flex flex-row w-full h-full">
                <PiBagFill className="size-7" />
                <span className="w-5 h-5 leading-5 bg-dark text-sm text-white text-center rounded-full mt-[-14px]">
                  {order.length}
                </span>
              </NavLink>
            </li>
          </ul>
          {isBarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
              <div
                className={`sidebar absolute top-0 left-0 w-96 h-full bg-white shadow-lg z-50 ${
                  isBarOpen ? "open" : ""
                }`}
              >
                <FaTimes className="size-7 m-4" onClick={toggleBar} />
                <ul className="mt-10">
                {user && (
                    <>
                    <li className="px-6 py-4 border-b-2">
                      <NavLink to="/profile" onClick={toggleBar}>
                        PROFILE
                      </NavLink>
                    </li>
                    <li className="px-6 py-4 border-b-2">
                        <NavLink to="/signup" onClick={toggleBar}>
                            SIGNUP
                        </NavLink>
                    </li>
                    <li className="px-6 py-4 border-b-2">
                        <NavLink to="/" onClick={handleSignout}>
                            SIGNOUT
                        </NavLink>
                    </li>
                    <li className="px-6 py-4 border-b-2">
                      <NavLink to="/orders" onClick={toggleBar}>
                        ORDERS
                      </NavLink>
                    </li>
                    </>
                    )}
                  <li className="px-6 py-4 border-b-2">
                    <NavLink to="/men" onClick={toggleBar}>
                      MEN
                    </NavLink>
                  </li>
                  <li className="px-6 py-4 border-b-2">
                    <NavLink to="/women" onClick={toggleBar}>
                      WOMEN
                    </NavLink>
                  </li>
                  <li className="px-6 py-4 border-b-2">
                    <NavLink to="/shop" onClick={toggleBar}>
                      COLLECTION
                    </NavLink>
                  </li>
                  <li className="px-6 py-4 border-b-2">
                    <NavLink to="/lookbook" onClick={toggleBar}>
                      LOOKBOOK
                    </NavLink>
                  </li>
                  <li className="px-6 py-4 border-b-2">
                    <NavLink to="/sale" onClick={toggleBar}>
                      SALE
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

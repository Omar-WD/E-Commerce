import "./App.css";
import ProductList from "./components/ProductList";
import TopNav from "./components/TopNav";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./context/ProductProvider";
import ProductView from "./components/ProductView";
import SideCart from "./components/SideCart";
import CheckOut from "./components/CheckOut";
import LookBook from "./components/LookBook";
import Footer from "./components/Footer";
import OurStory from "./components/OurStory";
import Contact from "./components/Contact";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import NewProduct from "./components/NewProduct";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import OrderList from "./components/OrderList";
import Order from "./components/Order";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateProduct from "./components/UpdateProduct";
import Profile from "./components/Profile";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  const [bgColorandOpacity, setBgColorandOpacity] = useState("");
  const { products, sideCartIsOppened, loading } = useContext(ProductContext);
  const [scrollLocation, setScrollLocation] = useState(0);
  const [arrowDisplay, setArrowDisplay] = useState("hidden");

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 

  useEffect(() => {
    const handleScroll = () => {
      setScrollLocation(window.scrollY);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  useEffect(() => {
    if (scrollLocation > 100) {
      setArrowDisplay("block");
    } else {
      setArrowDisplay("hidden");
    }
  }, [scrollLocation]);
  
  useEffect(() => {
    if (sideCartIsOppened) {
      setBgColorandOpacity("bg-black bg-opacity-10");
    } else {
      setBgColorandOpacity("");
    }
  }, [sideCartIsOppened]);

  if (loading) {
    return <div className="w-5/6 mx-auto px-16 py-16 my-12">Loading...</div>;
  } else {
    return (
      <Elements stripe={stripePromise} className="app">
        <div className={`${bgColorandOpacity}`}>
          <TopNav />
          <Routes>
            <Route path="/" element={<ProductList products={products} />} />
            <Route path="/shop" element={<ProductList products={products} />} />
            <Route
              path="/men"
              element={<ProductList category2="Men" products={products} />}
            />
            <Route
              path="/women"
              element={<ProductList category2="Women" products={products} />}
            />
            <Route path="/lookbook" element={<LookBook />} />
            <Route path="/sale" element={<ProductList products={products} />} />
            <Route path="/about" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/product/:_id"
              element={<ProductView products={products} />}
            />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/orders/:id" element={<Order />} />
            </Route>
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>

        <SideCart />
        {/* {path !== "/profile" && path !== "/signin" && path !== "/signup" && path !== "/checkout" && path == "*"  &&  */}
        <Footer />
         {/* } */}
        
        <FaArrowAltCircleUp
          onClick={handleScrollToTop}
          className={` ${arrowDisplay} fixed right-10 bottom-20 size-10 text-red-600 cursor-pointer hover:text-red-800`}
        />
      </Elements>
    );
  }
}

export default App;

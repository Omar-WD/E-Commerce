import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import OrderProvider from "./context/OrderProvider.jsx";
import ProductProvider from "./context/ProductProvider.jsx";
import UserProveider  from "./context/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProveider>
      <OrderProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </OrderProvider>
    </UserProveider>
  </BrowserRouter>
);

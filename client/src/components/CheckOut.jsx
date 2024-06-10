import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../axiosClient";

export default function CheckOut() {
  const { order, setOrder, setInvoiceSettled } = useContext(OrderContext);
  const navigate = useNavigate();

  const subTotal = order.reduce(
    (acc, orderItem) => acc + orderItem.price * orderItem.qty,
    0
  );

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("pay");
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setError(e.error ? e.error.message : "");
  };

  const createPaymentIntent = async (amount) => {
    try {
      const username = document.getElementById("username").value;
      const address = document.getElementById("address").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;

      const orderItems = order.map((orderItem) => ({
        product: orderItem.productId,
        quantity: orderItem.qty,
        size: orderItem.selectedSize,
        price: orderItem.price,
      }));

      const newOrder = {
        items: orderItems,
        user: username,
        address: address,
        phone: phone,
        email: email,
      };
      const response = await axiosClient.post(
        "/payment/create-payment-intent",
        {
          amount: Math.round(amount * 100),
        }
      );

      await axiosClient.post("/orders", {
        order: newOrder,
      });
      setInvoiceSettled(true);

      return response.data.clientSecret;
    } catch (error) {
      throw new Error("Failed to create payment intent");
    }
  };

  const handlePayment = async (e) => {
    console.log("currentDATE", new Date());
    e.preventDefault();
    setIsProcessing(true);
    setStatus("processing...");
    const cardElement = elements.getElement(CardElement);
    const { name, phone, email, address } = credentials;

    try {
      const clientSecret = await createPaymentIntent(subTotal);
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { name, phone, email, address: { line1: address } },
      });

      if (paymentMethodReq.error) {
        throw new Error(paymentMethodReq.error.message);
      }
      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (confirmPayment.error) {
        throw new Error(confirmPayment.error.message);
      }

      const updateData = {
        items: order.map((orderItem) => ({
          productId: orderItem.productId,
          sizes: [
            {
              size: Number(orderItem.selectedSize),
              qty: orderItem.qty,
            },
          ],
        })),
      };

      console.log("updateData", updateData);

      await axiosClient.put("/products/decrement-product-size-qty", updateData);
      setStatus("success");
      setTimeout(() => navigate("/"), 1000);
      resetForm();
      setOrder([]);
    } catch (error) {
      setError(error.message);
      setStatus("pay");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setTimeout(() => {
      setStatus("pay");
      setCredentials({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
      elements.getElement(CardElement).clear();
    }, 3000);
  };

  return (
    <div className="min-h-[80vh] pt-8 sm:pt-16 ">
        <div className=" min-h-96 flex flex-col justify-between items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-[600] font-sans">Checkout</h1>
          <div className="relative  flex flex-col-reverse md:flex-row w-full px-2 py-10 sm:pt-10 md:py-20 md:px-16 lg:px-20 xl:px-24 2xl:px-32   gap-8   md:gap-6 lg:gap-20 xl:gap-24 2xl:gap-32">
            <div className="w-full md:w-3/6 xxs:px-4 xs:px-14 sm:px-20 md:px-2">
              <label className="text-2xl sm:text-3xl md:text-4xl font-semibold sm:pl-4">Billing Details:</label>

              <form
                className="form h-[560px] flex flex-col gap-6 justify-between items-center p-4 md:p-8 border-2 border-gray-200 rounded-lg shadow-md bg-black bg-opacity-10"
                onSubmit={handlePayment}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  id="username"
                  required
                  className="input h-10  p-2 w-[98%] rounded-lg shadow-md "
                  onChange={handleChange}
                  value={credentials.name}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  id="phone"
                  name="phone"
                  required
                  className="input  h-10  p-2 w-[98%] rounded-lg shadow-md"
                  onChange={handleChange}
                  value={credentials.phone}
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  className="input  h-10  p-2 w-[98%] rounded-lg shadow-md"
                  onChange={handleChange}
                  value={credentials.email}
                />
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  id="address"
                  required
                  className="input  h-10  p-2 w-[98%] rounded-lg shadow-md"
                  onChange={handleChange}
                  value={credentials.address}
                />
                <p>{error}</p>
                <CardElement
                  options={{
                    hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: "20px",
                        lineHeight: "30px",
                        backgroundColor: "#fff",
                        width: "100%",
                        heigh: "50px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                  className="  w-[98%] h-12  shadow-md bg-white p-[10px] rounded-lg "
                  onChange={handleCardChange}
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className=" bg-red-700  w-[98%] h-10 rounded-xl text-white font-bold text-2xl hover:bg-red-600 "
                >
                  {status}
                </button>
              </form>
            </div>
            <div className="w-full md:w-3/6 xxs:px-4 xs:px-14 sm:px-20 md:px-2">
              <div className="w-full  ">
                <label
                  htmlFor="your-order"
                  className=" hidden sm:block sm:text-3xl md:text-4xl font-semibold sm:pl-4"
                >
                  Your Order:
                </label>
                <div className="flex flex-row w-full justify-between text-xl text-white font-semibold font-serif bg-black bg-opacity-10 p-4 border-2 rounded-t-xl">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>
                <div className=" ">
                  <div className="h-[250px] md:h-[435px] overflow-y-auto">

                  {order &&
                    order.map((orderItem, index) => (
                      <div
                        key={index}
                        className="inline-flex  w-full gap-2 justify-between items-center py-6 px-4 border-b-2 border-x-2"
                      >
                        <div className="h-full flex flex-row justify-between items-center gap-4">
                          <img
                            src={orderItem.img}
                            alt="shoesImg"
                            className="size-16 aspect-square"
                          />
                          <h6 className=" whitespace-break-spaces">
                            {orderItem.name} ({orderItem.selectedSize}) x{" "}
                            {orderItem.qty}
                          </h6>
                        </div>
                        <span>
                          ${(orderItem.price * orderItem.qty).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="inline-flex w-full justify-between text-xl text-lightGray font-semibold p-4 mb-10 border-2 border-t-0 shadow-xl">
                    <span>Subtotal :</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

import { ShopContext } from "@/Pages/Context/shopContext";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Ensure axios is imported

const Order = () => {
  const {
    cardItems,
    all_products,
    deleteAllOrder,
    getObjectLength,
    url,
    token,
    clearAllOrders,
  } = useContext(ShopContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    street: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    all_products.forEach((product) => {
      if (cardItems[product._id] > 0) {
        let itemInfo = { ...product, quantity: cardItems[product._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems, 
      amount: calculateSubTotal() + 5, // Include delivery charge
    };

    try {
      let response = await axios.post(`${url}/api/order`, orderData, {
        headers: {
          token,
        },
      });
      if (response.data.success) {
        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl); // Redirect to Stripe Checkout
        toast("Order Placed Successfully");
        clearAllOrders();
      } else {
        toast("Order Not Placed");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast("Order Not Placed");
    }
  };

  const [couponApplied, setCouponApplied] = useState(false);

  const calculateSubTotal = () => {
    return all_products
      .reduce((total, product) => {
        return total + product.price * (cardItems[product._id] || 0);
      }, 0)
      .toFixed(2);
  };

  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto py-10 px-5 md:px-0">
      <form
        onSubmit={placeOrder}
        className="flex flex-col xl:flex-row xl:gap-16 bg-white rounded-lg shadow-lg p-6"
      >
        {/* Delivery Information Section */}
        <div className="flex flex-1 flex-col text-sm">
          <h3 className="text-3xl font-bold mb-6">Delivery Information</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              required
              onChange={onChangeHandler}
              value={data.firstName}
              name="firstName"
              type="text"
              placeholder="First name"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.lastName}
              name="lastName"
              type="text"
              placeholder="Last name"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              required
              onChange={onChangeHandler}
              value={data.email}
              name="email"
              type="email"
              placeholder="Email address"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              required
              onChange={onChangeHandler}
              value={data.phone}
              name="phone"
              type="tel"
              placeholder="Phone number"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              required
              onChange={onChangeHandler}
              value={data.address}
              name="address"
              type="text"
              placeholder="Street"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.city}
              name="city"
              type="text"
              placeholder="City"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.state}
              name="state"
              type="text"
              placeholder="State"
              className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              required
              onChange={onChangeHandler}
              value={data.zipcode}
              name="zipcode"
              type="text"
              placeholder="Zip Code"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <input
              required
              onChange={onChangeHandler}
              value={data.country}
              name="country"
              type="text"
              placeholder="Country"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
            />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="flex flex-col w-full xl:w-1/2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold mb-4">Order Summary</h4>
            <div className="flex justify-between mb-3">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg font-semibold">
                ${calculateSubTotal()}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg">Shipping Fee</span>
              <span className="text-lg font-semibold">
                {getObjectLength() > 0 ? `$${5 * 278}` : `$0.00`}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg">Coupon Discount</span>
              <span className="text-lg font-semibold">
                {couponApplied ? `-$10.00` : `-$0.00`}
              </span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">
                ${getObjectLength() > 0
                  ? (calculateSubTotal() + 5 * 278 - (couponApplied ? 10 : 0)).toFixed(2)
                  : `$0.00`}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
              Place Order
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-blue-500 text-lg font-semibold py-3 rounded-lg shadow-md hover:bg-blue-100 transition-all"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Order;

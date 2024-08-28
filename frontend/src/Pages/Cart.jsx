import React, { useContext } from "react";
import { ShopContext } from "../Pages/Context/shopContext";
import { TbTrash } from "react-icons/tb";
import { FaArrowAltCircleRight, FaMinus, FaPlus } from "react-icons/fa";
import Dialog from "../components/ui/UiComp/dialog";
import { Link, useNavigate } from "react-router-dom";
import { LoginPage } from "@/components/comp";

const Cart = () => {
  const {token} = useContext(ShopContext);
  const { cardItems, all_products, removeFromCart, addtocart, deleteAllOrder, getObjectLength } = useContext(ShopContext);

  const calculateSubTotal = () => {
    return all_products.reduce((total, product) => {
      return total + (product.price * (cardItems[product._id] || 0));
    }, 0).toFixed(2);
  };

  const navigate = useNavigate();
  const handleClick = () => {
      navigate("/order");
  }

  return (
    <>
      {!token ? (
        <LoginPage/>
      ) : (
        <>
          {getObjectLength() <= 0 ? (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-red-500">
              <div className="flex flex-col items-center justify-center gap-y-6 bg-white rounded-lg p-8 shadow-xl max-w-md mx-4">
                <span className="font-semibold text-3xl text-gray-800 mb-4">No products found in the cart</span>
                <Link to="/">
                  <div className="flex items-center gap-x-3 bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded-lg p-2">
                    <button className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                      Visit Product Page
                    </button>
                    <FaArrowAltCircleRight className="text-3xl text-white" />
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <section className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-300">
                      <th className="p-3 text-left">Products</th>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Quantity</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left ml-1">
                        {getObjectLength() > 1 && (
                          <div className="bg-red-500 text-white p-2 rounded-full">
                            <Dialog />
                          </div>
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {all_products.map((product) => {
                      if (cardItems[product._id] > 0) {
                        return (
                          <tr key={product._id} className="border-b border-gray-200">
                            <td className="p-3 flex items-center">
                              <img
                                src={`http://localhost:3000/image/${product.image}`}
                                alt={product.name}
                                height={50}
                                width={50}
                                className="rounded-lg border border-gray-300"
                              />
                            </td>
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">${product.price.toFixed(2)}</td>
                            <td className="p-3 flex items-center space-x-2">
                              <button
                                onClick={() => removeFromCart(product._id)}
                                className="h-8 w-8 rounded-full flex items-center justify-center bg-red-500 text-white hover:bg-red-600"
                              >
                                <FaMinus />
                              </button>
                              <span className="text-lg font-semibold">{cardItems[product._id]}</span>
                              <button
                                onClick={() => addtocart(product._id)}
                                className="h-8 w-8 rounded-full flex items-center justify-center bg-green-500 text-white hover:bg-green-600"
                              >
                                <FaPlus />
                              </button>
                            </td>
                            <td className="p-3">${(product.price * cardItems[product._id]).toFixed(2)}</td>
                            <td className="p-3 text-center">
                              <TbTrash
                                onClick={() => deleteAllOrder(product._id)}
                                className="text-red-500 cursor-pointer hover:text-red-700"
                              />
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col xl:flex-row gap-20 mt-1 p-6 bg-gray-100 rounded-lg shadow-md">
                <div className="w-full xl:w-1/2">
                  <h4 className="text-2xl font-semibold mb-4">Order Summary</h4>
                  <div className="flex justify-between mb-3">
                    <span className="text-lg">Subtotal</span>
                    <span className="text-lg font-semibold">${calculateSubTotal()}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-lg">Shipping Fee</span>
                    <span className="text-lg font-semibold">
                      {getObjectLength() > 0 ? `${5.00}` : ""}
                    </span>
                  </div>
                  <hr className="my-3 border-gray-300" />
                  <div className="flex justify-between mb-3">
                    <span className="text-xl font-semibold">Total</span>
                    <span className="text-xl font-semibold">${(parseFloat(calculateSubTotal()) + 5.00).toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
                   onClick={handleClick}>
                    Proceed to Checkout
                  </button>
                </div>

                <div className="w-full xl:w-1/2">
                  <h4 className="text-2xl font-semibold mb-4">Have a Coupon?</h4>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Cart;

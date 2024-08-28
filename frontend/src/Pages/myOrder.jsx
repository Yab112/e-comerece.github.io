import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Pages/Context/shopContext.jsx";
import LogingPage from "../components/comp/LogingPage.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBox, FaBoxes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Myorder = () => {
  const { token, url, } = useContext(ShopContext);
  const [data, setData] = useState([]);
  const Navigate = useNavigate();
 
  if (!token) {
    return <Navigate to="/" />;
  }
  const handleClick = () => {
    navigate('/');
  };

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${url}/api/order`, {
        headers: {
          token,
        },
      });

      if (!response.data.success) {
        toast("Small error fetching data");
        return;
      }
      setData(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response ? error.response.data : error.message
      );
      toast(error.response ? error.response.data.message : error.message);
    }
  };
  
  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  useEffect(() => {
    console.log("Fetched data:", data);
  }, []);

  const dataArray = Array.isArray(data) ? data : [data];
  return (
    <>
      {!token ? (
        <LogingPage />
      ) : (
        <section className="max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              My Orders
            </h2>
            <div>
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr className="border-b border-gray-300">
                    <th className="p-2 text-left hidden sm:table-cell">
                      Package
                    </th>
                    <th className="p-2 text-left">Item Details</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Amount</th>
                    <th className="p-2 text-left">orderedDAte</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Track</th>
                  </tr>
                </thead>
                <tbody>
                  {dataArray.length > 0 ? (
                    dataArray.map((order, i) => (
                      <tr
                        key={order._id}
                        className="border-b border-gray-200 hover:shadow-2xl hover:shadow-amber-200  "
                      >
                        <td className="p-2 text-left hidden sm:table-cell">
                          <FaBox className="text-xl text-orange-500" />
                        </td>
                        <td className="p-2">
                          {order.items &&
                            order.items.map((item, index) => (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row items-center mb-2 max-h-24 overflow-y-auto"
                              >
                                <img
                                  src={`${url}/Image/${item.image}`}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover mr-4"
                                />
                                <div>
                                  <strong>{item.name}</strong>
                                  <p className="text-sm text-gray-600">
                                    {item.descritpion}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </td>
                        <td className="p-2">
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}
                        </td>
                        <td className="p-2">${order.amount.toFixed(2)}</td>
                        <td className="p-2">{order.createdAt}</td>
                        <td className="p-2  text-center">
                          <span
                            className={`hidden lg:inline-block w-2 h-2 rounded-full mr-2 ${
                              order.status === "pending"
                                ? "bg-yellow-400"
                                : order.status === "Delivered"
                                ? "bg-green-400"
                                : "bg-red-600"
                            }`}
                          ></span>
                          {order.status}
                        </td>
                        <td className="p-2">
                      
                            <button className="bg-orange-300 py-2 px-1 rounded-md" onClick={fetchOrder}>
                              Track
                            </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        <div className="flex flex-col items-center justify-center h-full gap-2">
                          <p className="mb-4">No orders found</p>
                          <button type="button" className="btn btn-outline-primary bg-orange-300 p-2 rounded-md" onClick={handleClick}>Go to Home Page</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Myorder;

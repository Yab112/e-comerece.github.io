import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './Context/AdminContext'
import { FaBox } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { url } = useContext(AdminContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.status === 200) {
        setOrders(response.data.data);
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    }
  };
  

  const statusHandler = async (id, status) => {
    try {
      const response = await axios.put(`${url}/api/order/update/${id}`, { status });
      if (response.status === 200) {
        toast.success('Order status updated successfully');
        fetchOrders();
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to update order status');
      console.error('Error updating order status:', error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h4 className="text-2xl font-semibold mb-6">Orders</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-300">
              <th className="p-2 text-left">Package</th>
              <th className="p-2 text-left">Order</th>
              <th className="p-2 text-left">Items</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-2 text-center"><FaBox className="text-xl text-orange-500" /></td>
                <td className="p-2">
                  <div className="mb-2">
                    <p>
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} ({item.quantity}){idx < order.items.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                  <hr />
                  <div className="mt-2">
                    <h5 className="font-semibold">{order.address.firstName} {order.address.lastName}</h5>
                    <p className="text-sm text-gray-600">
                      {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                    </p>
                    <p className="text-sm text-gray-600">{order.address.phone}, {order.address.email}</p>
                  </div>
                </td>
                <td className="p-2 text-center">{order.items.length}</td>
                <td className="p-2 text-center">${order.amount.toFixed(2)}</td>
                <td className="p-2 text-center">
                  <select
                    name="status"
                    id="status"
                    className="border border-gray-300 rounded-md p-1"
                    defaultValue={order.status}
                    onChange={(e) => statusHandler(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;

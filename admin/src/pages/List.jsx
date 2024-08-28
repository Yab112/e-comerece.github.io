import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa6';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onRemove = async (id) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/product/remove`, { id: id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after deletion
      } else {
        toast.error('Failed to remove product');
      }
    } catch (error) {
      toast.error('Error removing product');
    }
  };

  return (
    <section className="py-14 bg-white min-h-screen">
      <div className="container px-6">
        <h4 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Product List</h4>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Product Image</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {list.map((item, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100  transform transition-transform duration-300"
                  key={index}
                >
                  <td className="py-3 px-6 text-left">
                    <img
                      src={`http://localhost:3000/image/${item.image}`}
                      alt="product"
                      className="h-16 w-16 object-cover rounded-lg hover:scale-125"
                    />
                  </td>
                  <td className="py-3 px-6 text-left">
                    <div className="font-medium">{item.name}</div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="text-green-500 font-semibold">${item.price}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => onRemove(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default List;

import React, { useContext, useState } from "react";
import { FaPlus, FaMinus, FaExpandArrowsAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Pages/Context/shopContext";

const Item = ({ product }) => {
  const { cardItems, setcardItems, addtocart, removeFromCart } =
    useContext(ShopContext);
  return (
    <div className="relative shadow-sm">
      <Link to={`/product/${product._id}`}>
        <div className="group relative">
          <img
            src={`http://localhost:3000/image/${product.image}`}
            alt="productimage"
            className="rounded-tl-2xl rounded-tr-2xl"
          />
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <h5 className="text-[10px] font-bold text-gray-900 border border-red-100 rounded-full px-4 text-center flex items-center justify-center">
              {product.category}
            </h5>
            <div className="text-secondary font-bold text-lg ">
              <p className="font-bold text-amber-600 text-xl">
                ${product.price}
              </p>
            </div>
          </div>
          <div className="border-none bg-slate-100 w-full p-4 shadow-md hover:scale-150 hover:zoom-out-100">
            <h4 className="font-medium text-lg mb-1 line-clamp-1">
              {product.name}
            </h4>
            <p className="line-clamp-2">{product.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;

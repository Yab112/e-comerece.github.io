import React, { useState, useContext } from 'react';
import { FaPlus, FaMinus, FaMale, FaFemale } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ShopContext } from '../../Pages/Context/shopContext';

const ProductMd = ({ product }) => {
  const { addtocart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handlePlus = () => {
    setQuantity(quantity+1)
  };
  const handleMinus = () => {
    setQuantity(quantity - 1)
  };
  const handleAddTOCart = () => {
    addtocart(product._id, quantity);
    toast.success(`${product.name} with quantity ${quantity}added to cart!`);
  };

 
  return (
    <div className="max-w-lg p-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <hr className="my- border-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className='flex mt-2 flex-row items-center'>
        {product.category === "Men" ? <FaMale className='w-10 h-10 text-amber-500'/> : <FaFemale /> }
        <p className="text-lg text-gray-600">{product.category}</p>
      </div>
      <p className="text-3xl font-semibold my-4">${product.price}</p>

      {/* Size Options */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Available Sizes</h4>
        <div className="flex gap-2 mt-2">
          {['S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 px-4 border rounded-md ${
                selectedSize === size ? 'border-black' : 'border-gray-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Options */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold">Available Colors</h4>
        <div className="flex gap-2 mt-2">
          {['Red', 'Blue', 'Green', 'Black'].map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full ${
                selectedColor === color ? 'ring-2 ring-black' : ''
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Stock Availability */}
      <p className="text-green-600 mb-4">In Stock</p>

      {/* Quantity Selector */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={handleMinus}
          className="p-2 border rounded-full"
        >
          <FaMinus />
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          onClick={handlePlus}
          className="p-2 border rounded-full"
        >
          <FaPlus />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddTOCart}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductMd;

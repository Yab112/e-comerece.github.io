import React from 'react';
import { TbArrowRight } from 'react-icons/tb';
import {useNavigate} from "react-router-dom"
const ProductHd = ({ product }) => {
  const navigate = useNavigate()
  const handleNavigate = ()=>{
    navigate("/")
  }
  return (
    <div className="max-padd-container flex flex-col items-center py-4 capitalize">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-center mb-6">
        <p onClick={handleNavigate}>Home</p>
        <TbArrowRight />
        <span>{product.name}</span>
      </div>

      {/* Product Images */}
      <div className="flex flex-wrap justify-center mt-10 gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <img
              key={index}
              src={`http://localhost:3000/image/${product.image}`}
              alt={`Thumbnail ${index + 1}`}
              className="w-[100px] h-[100px] rounded-md opacity-90 hover:opacity-100"
            />
          ))}
        </div>
        {/* Main Product Image */}
        <div>
          <img
            src={`http://localhost:3000/image/${product.image}`}
            alt={product.name}
            className="rounded-md w-96 h-[490px] hover:opacity-80"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductHd;

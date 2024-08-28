import React from 'react';

const ProductDescription = ({ product }) => {
  return (
    <div className="max-w-2xl p-4">
      <h3 className="text-xl font-bold mb-2">Product Description</h3>
      <p className="mb-6">{product.descritpion}</p>

      {/* Product Reviews */}
      <div className="mb-6">
        <h4 className="text-lg font-bold">Customer Reviews</h4>
        <p className="text-yellow-500">★★★★☆</p>
        <p>"This blouse is amazing! The fit is perfect and the quality is top-notch."</p>
      </div>

      {/* Additional Product Details */}
      <div>
        <h4 className="text-lg font-bold">Product Details</h4>
        <ul className="list-disc pl-5">
          <li>Material: 100% Cotton</li>
          <li>Care Instructions: Machine Wash Cold</li>
          <li>Imported</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;

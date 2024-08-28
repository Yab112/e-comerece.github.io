import React from 'react';
import { Link } from 'react-router-dom';

const SimilarProduct = ({ product, all_products }) => {
  // Filter products that have the same category as the current product
  const similarProducts = all_products.filter(
    (p) => p.category === product.category && p._id !== product._id
  );

  return (
    <div className="similar-products-container">
      <h3 className="text-xl font-semibold mb-4">Similar Products</h3>
      
      <div className="flex flex-wrap gap-2">
        {similarProducts.length > 0 ? (
          similarProducts.map((similarProduct) => (
            <Link key={similarProduct._id} to={`/product/${similarProduct._id}`}>
              <div className="similar-product-card border p-4 rounded-md">
                <img
                  src={`http://localhost:3000/image/${similarProduct.image}`}
                  alt={similarProduct.name}
                  className="w-60 h-60 object-cover mb-2 rounded-md items-center"
                />
                <h4 className="text-lg font-bold">{similarProduct.name}</h4>
                <p className="text-amber-600">${similarProduct.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </div>
    </div>
  );
};

export default SimilarProduct;

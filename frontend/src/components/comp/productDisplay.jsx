import { useContext } from 'react';
import { ShopContext } from "../../Pages/Context/shopContext";
import Item from '../comp/Item'; 

const ProductDisplay = ({ category }) => {
  const { all_products } = useContext(ShopContext);
  
  if (!all_products) {
    return <div>Loading...</div>;
    {console.log("erroooorr")}
  }

  return (
    <div className='max-padd-container pt-8 pb-16 xl:pb-28'>
      <h2 className='bold-32 '>Our Great Products</h2>
      <div className='grid gap-2 gird-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-14'>
        {all_products.map((product) => {
          if (category === 'All' || category === product.category) {
            return (
              <div key={product._id}>
                <Item product={product} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;

import { useContext } from "react";
import { ShopContext } from "../Pages/Context/shopContext";
import { useParams, useNavigate } from "react-router-dom";
import { ProductMd, ProductHd, ProductDescription, SimilarProducts } from "../components/comp";
import { toast } from "react-toastify";

const Product = () => {
  const { all_products, token } = useContext(ShopContext);
  const { prodId } = useParams();
  const Navigate = useNavigate(); // Correct usage of the hook

  if (!token) {
    return <Navigate to="/" />;
  }

  const product = all_products?.find(product => product._id === prodId);

  if (!product) {
    toast.error("Product not found!"); 
    Navigate("/");
    return null; 
  }

  return (
    <section className="max-padd-container py-10 bg-primary">
      <div className="flex gap-0">
        <ProductHd product={product} />
        <ProductMd product={product} />
      </div>
      <ProductDescription product={product}/>
      <SimilarProducts product={product} all_products={all_products}/>
    </section>
  );
};

export default Product;

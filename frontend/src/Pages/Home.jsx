import { useState,useContext } from 'react';
import { ProductDisplay ,GetApp,Footer,Hero,Category, Livedata, Discover} from '../components/comp';
import { ShopContext } from '../Pages/Context/shopContext';

const Home = () => {
  const [category, setCategory] = useState("All");
 const {token} = useContext(ShopContext);
  return (
    <>
      <Hero />
      <Livedata/>
      <Discover/>
      <Category category={category} setCategory={setCategory} />
      <ProductDisplay category={category}/>
      <GetApp/>
      <Footer />
    </>
  );
}

export default Home;

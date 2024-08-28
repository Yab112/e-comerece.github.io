import React, { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import ImageSlider from './ImageSlider';  // Adjusted the import path and name
import { ShopContext } from '@/Pages/Context/shopContext';

const MostPopular = () => {
  const { all_products } = useContext(ShopContext);
  const images = all_products.map(product => product.image).slice(0, 4);

  return (
    <section className='flex flex-col justify-center items-center ml-8'>
      <div className='flex justify-between gap-4 w-full max-w-4xl'>
        <h1 className='text-2xl font-mono'>Top Ranking</h1>
        <div className='flex gap-2 items-center'>
          <a href='#' className='text-amber-500 border-b-2 border-black'>See All</a>
          <FaArrowRight />
        </div>
      </div>
      
      <div className='flex flex-col items-center gap-4 bg-white border border-amber-100 p-4 rounded-md w-full max-w-4xl mt-2'>
        <div className='flex justify-between items-center flex-col gap-4'>
          <span className='text-2xl font-mono'>Most Popular</span>
          <div className='flex gap-2 items-center w-full max-w-md h-80'>
            <ImageSlider images={images} /> 
          </div>
        </div>
        <div className='w-full max-w-md mt-4'>
          <span className='break-words'>
            This ultra-soft, breathable fabric provides ultimate comfort throughout the day. Designed with a modern fit, it's perfect for both casual wear and active lifestyles. Available in various colors and sizes.
          </span>
        </div>
      </div>
      
    </section>
  );
};

export default MostPopular;

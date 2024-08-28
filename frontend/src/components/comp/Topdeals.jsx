import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { ShopContext } from '@/Pages/Context/shopContext';

const Topdeals = () => {
            const { all_products } = useContext(ShopContext);
            const [images, setImages] = useState([]);

            useEffect(() => {
              if (all_products && all_products.length > 0) {
                setImages(all_products.map(product => product.image).slice(0, 4));
              }
            }, [all_products]);

            return (
              <section className='flex flex-col items-center gap-4'>
                 <div className='flex justify-between gap-40'>
                       <h1 className='text-2xl font-mono'>New Arrivals</h1>
                       <div className='flex gap-2 items-center'>
                           <a href='#' className='text-amber-500 border-b-2 border border-b-black'>See All</a>
                           <FaArrowRight/>
                       </div>
                   </div>
                   <dir className='flex flex-col items-center gap-4 bg-white border border-amber-100 p-4 rounded-md w-full max-w-4xl mt-2'>
                      {images.length > 0 && (
                        <div className='p-2 flex items-center'>
                          <img
                            src={`http://localhost:3000/image/${images[0]}`}
                            alt={`Slide 1`}
                            className="w-32 border-none rounded-md"
                          />
                          <h2 className='text-2xl font-sans text-slate-900'>Lowest Price Offers</h2>
                        </div>
                      )}
                   </dir>
              </section>
            )
}

export default Topdeals
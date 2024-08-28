import { ShopContext } from '@/Pages/Context/shopContext';
import React, { useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa'

const NewArrivals = () => {
  const { all_products } = useContext(ShopContext);
  const images = all_products.map(product => product.image).slice(0, 4);
  return (
    <section className='flex flex-col items-center gap-4'>
       <div className='flex justify-between gap-40'>
             <h1 className='text-2xl font-mono'>New Arrivals</h1>
             <div className='flex gap-2 items-center'>
                 <a href='#' className='text-amber-500 border-b-2 border border-b-black'>See All</a>
                 <FaArrowRight/>
             </div>
         </div>
         <div className='bg-white border border-amber-100 p-4 rounded-md w-full max-w-4xl mt-2'>
            <span className='text-2xl font-mono'>109,000+ products added today</span>
               <div className='w-[400px] m-2 flex flex-wrap'>
                    {images.map((image, index) => (
                        <img
                        key={index}
                        src={`http://localhost:3000/image/${image}`}
                        alt={`Slide ${index + 1}`}
                        className="w-48 border-none rounded-md"
                        />
                    ))}
               </div>
         </div>
    </section>
  )
}

export default NewArrivals
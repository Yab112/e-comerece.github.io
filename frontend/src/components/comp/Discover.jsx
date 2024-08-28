import React from 'react'
import { MostPopular, NewArrivals, Topdeals } from '.'

const Discover = () => {
  return (
    <section className=" py-10 xl:py-20 mt-28 bg-slate-200" id="shop sm:flex-col sm:justify-center sm:items-center sm:gap-4">
        <div className='w-full flex flex-col items-center gap-4 mb-8'>
            <h1 className='text-3xl font-mono  mb-2'>Discover your dream products here</h1>
        </div>
        <div className="flex items-center gap-6 flex-wrap  justify-between mt-28 ">
               <MostPopular/>
               <NewArrivals/>
               <Topdeals/>
        </div>
    </section>
  )
}

export default Discover

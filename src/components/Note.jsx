import React from 'react'

const Note = () => {
    return (
        <div className='bg-black flex flex-col justify-center items-center text-center py-16 sm:py-20 lg:py-30 px-4 sm:px-6'>
            <p id='font2' className='text-white text-3xl sm:text-4xl lg:text-5xl uppercase mb-6 sm:mb-8'>
                Dear Perfume Lover
            </p>
            <p id='font3' className='text-white w-full sm:w-3/4 lg:w-2/4 text-base sm:text-lg lg:text-xl mt-6 sm:mt-10 lg:mt-15 leading-relaxed'>
                "Everything begins with sensing: scent, memory and emotion.<br className='hidden sm:block' />
                With closed eyes, we try to listen to that subtle bond between us and perfume.<br className='hidden sm:block' />
                Aesthetics and balance. This is how our story starts, this<br className='hidden sm:block' />
                is how the birth of a perfume takes shape along our path.<br className='hidden sm:block' />
                Creating a perfume is like searching for oneself, telling the emotion of an experience and then sharing it.<br /><br />
                Listen: at any point along our journey, the perfume tells a story. Through smells, free from any conditioning, you will remember a dormant part of your past — you will search for yourself."<br />
            </p>
            <button
                id='font4'
                className='text-white text-[13px] sm:text-[14px] lg:text-[15px] font-bold mt-8 sm:mt-10 uppercase border border-white px-6 sm:px-7 py-2.5 sm:py-3 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105'
            >
                Discover the fragrances
            </button>
        </div>
    )
}

export default Note
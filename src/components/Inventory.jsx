import React from 'react'
import { Link } from 'react-router-dom'
import { GoHeart } from "react-icons/go";

const Inventory = () => {
    const perfumes = [
        { id: 1, name: 'Isola', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 2, name: '1# Nota di Viaggio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 3, name: '2# Nota di Viaggio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 4, name: '3# Nota di Viaggio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 5, name: 'Notturno', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 6, name: 'Luce', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 7, name: 'Narcotico', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 8, name: 'Odor 93', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 9, name: 'Little Song', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 10, name: 'Magnificat', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 11, name: 'L\'Oblio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 12, name: 'Oro Rosso', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 13, name: 'Venezia', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 14, name: 'Roma', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 15, name: 'Firenze', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 16, name: 'Milano', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 17, name: 'Napoli', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 18, name: 'Palermo', priceSmall: '8,00 €', priceLarge: '180,00 €' },
    ]

    return (
        <div className='bg-white w-full'>
            {/* PERFUMES Heading */}
            <div className='border-t border-gray-200 py-8 sm:py-10 lg:py-12'>
                <h1 id='font2' className='text-2xl sm:text-3xl lg:text-4xl text-center uppercase tracking-[0.15em]'>
                    Perfumes
                </h1>
            </div>

            {/* Product Grid - Full Width */}
            <div className='w-full px-4 sm:px-8 lg:px-12 xl:px-20 pb-16 lg:pb-20'>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10'>
                    {perfumes.map((perfume) => (
                        <Link
                            to={`/perfume/${perfume.id}`}
                            key={perfume.id}
                            className='flex flex-col group cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl rounded-lg overflow-hidden bg-white hover:bg-gray-200'
                        >
                            {/* Product Image Container */}
                            <div className='w-full bg-[#e8e8e8] group-hover:bg-[#d0d0d0] aspect-3/4 mb-0 overflow-hidden relative transition-all duration-500'>
                                <img
                                    src='https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/07/Meo-Fusciuni-Sito-Still-Life-rfer.001-683x908.jpeg'
                                    alt={perfume.name}
                                    className='w-full h-full object-contain transition-all duration-500 ease-out group-hover:scale-110'
                                />
                                {/* Heart Icon */}
                                <button
                                    onClick={(e) => e.preventDefault()}
                                    className='absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 group-hover:shadow-lg transition-all duration-300'
                                >
                                    <GoHeart className='text-lg sm:text-xl text-gray-600 hover:text-red-500 group-hover:text-red-400 transition-colors' />
                                </button>
                            </div>

                            {/* Select Options Button */}
                            <div className='w-full py-2.5 sm:py-3 border border-gray-300 bg-white group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 flex items-center justify-center gap-2'>
                                <span id='font2' className='text-[10px] sm:text-[11px] lg:text-[12px] tracking-widest'>Select options</span>
                                <span className='text-sm sm:text-base'>→</span>
                            </div>

                            {/* Product Name & Price */}
                            <div className='pt-3 sm:pt-4 pb-4 text-center bg-white'>
                                <p id='font3' className='text-[12px] sm:text-[13px] lg:text-[14px] italic text-black mb-1 group-hover:text-amber-800 transition-colors duration-300'>
                                    {perfume.name}
                                </p>
                                <p id='font2' className='text-[10px] sm:text-[11px] lg:text-[12px] text-amber-600 group-hover:text-amber-700 transition-colors duration-300'>
                                    {perfume.priceSmall} – {perfume.priceLarge}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Inventory
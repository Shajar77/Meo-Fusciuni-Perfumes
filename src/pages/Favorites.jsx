import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { GoHeart, GoHeartFill } from "react-icons/go";

const Favorites = () => {
    const { favorites, removeFromFavorites, addToCart } = useCart()

    const handleAddToCart = (item) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.priceLarge,
            size: 'large',
            sizeLabel: '100ml'
        })
    }

    return (
        <div className='w-full min-h-screen bg-white'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Header */}
                <div className='border-b border-gray-200 py-12 sm:py-16'>
                    <div className='max-w-6xl mx-auto px-6 text-center'>
                        <GoHeartFill className='text-4xl text-red-500 mx-auto mb-4' />
                        <h1 id='font1' className='text-3xl sm:text-4xl lg:text-5xl mb-4'>
                            My Favorites
                        </h1>
                        <p id='font3' className='text-gray-500'>
                            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-6xl mx-auto px-6 py-12 sm:py-16'>
                    {favorites.length === 0 ? (
                        <div className='text-center py-20'>
                            <GoHeart className='text-6xl text-gray-300 mx-auto mb-6' />
                            <h2 id='font2' className='text-xl uppercase tracking-wider mb-4'>No favorites yet</h2>
                            <p id='font3' className='text-gray-500 mb-8'>Start adding perfumes you love to your wishlist</p>
                            <Link
                                to='/Perfumes'
                                id='font2'
                                className='inline-block px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors'
                            >
                                Explore Perfumes
                            </Link>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {favorites.map((item) => (
                                <div key={item.id} className='group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow'>
                                    <Link to={`/perfume/${item.id}`} className='block'>
                                        <div className='bg-[#e8e8e8] aspect-square overflow-hidden'>
                                            <img
                                                src='https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/07/Meo-Fusciuni-Sito-Still-Life-rfer.001-683x908.jpeg'
                                                alt={item.name}
                                                className='w-full h-full object-contain group-hover:scale-105 transition-transform duration-500'
                                            />
                                        </div>
                                    </Link>
                                    <div className='p-4'>
                                        <Link to={`/perfume/${item.id}`}>
                                            <h3 id='font1' className='text-lg mb-1 hover:text-amber-700 transition-colors'>{item.name}</h3>
                                        </Link>
                                        <p id='font2' className='text-amber-700 text-sm mb-4'>
                                            {item.priceSmall} – {item.priceLarge}
                                        </p>
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                id='font2'
                                                className='flex-1 py-3 bg-black text-white text-xs uppercase tracking-wider hover:bg-amber-700 transition-colors'
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => removeFromFavorites(item.id)}
                                                className='px-4 py-3 border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-colors'
                                            >
                                                <GoHeartFill className='text-red-500' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Favorites

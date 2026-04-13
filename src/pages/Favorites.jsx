import { useCallback } from 'react'
import { Link } from 'react-router-dom'


import { useCart } from '../context/CartContext'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoBagOutline } from "react-icons/io5";
import { getPerfumeById } from '../data/perfumes'

const Favorites = () => {
    const { favorites, removeFromFavorites, addToCart } = useCart()

    const handleAddToCart = useCallback((item) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.priceLarge,
            size: 'large',
            sizeLabel: '100ml'
        })
    }, [addToCart])

    return (
        <div className='w-full min-h-screen bg-[#0a0a0a]'>
            <div className='w-full'>

                {/* Header */}
                <div className='relative py-16 sm:py-24 border-b border-white/10'>
                    <div className='max-w-6xl mx-auto px-6 text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full border border-[var(--color-gold)]/30 mb-6'>
                            <GoHeartFill className='text-2xl text-[var(--color-gold)]' />
                        </div>
                        <h1 id='font1' className='text-3xl sm:text-4xl lg:text-5xl text-white mb-4'>
                            My Favorites
                        </h1>
                        <p id='font3' className='text-gray-400'>
                            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20'>
                    {favorites.length === 0 ? (
                        <div className='text-center py-24 bg-white/5 rounded-xl border border-white/10'>
                            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full border border-white/20 mb-8'>
                                <GoHeart className='text-3xl text-white/40' />
                            </div>
                            <h2 id='font2' className='text-xl uppercase tracking-[0.2em] text-white mb-4'>No favorites yet</h2>
                            <p id='font3' className='text-gray-500 mb-10'>Start adding perfumes you love to your collection</p>
                            <Link
                                to='/perfumes'
                                id='font2'
                                className='inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300'
                            >
                                Explore Collection
                            </Link>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {favorites.map((item) => (
                                <div key={item.id} className='group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[var(--color-gold)]/30 transition-all duration-300'>
                                    <Link to={`/perfume/${item.id}`} className='block'>
                                        <div className='bg-[#1a1a1a] aspect-square overflow-hidden'>
                                            <img
                                                src={getPerfumeById(item.id)?.image || '/logo.png'}
                                                alt={item.name}
                                                loading='lazy'
                                                decoding='async'
                                                fetchPriority='low'
                                                className='w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500'
                                            />
                                        </div>
                                    </Link>
                                    <div className='p-5'>
                                        <Link to={`/perfume/${item.id}`}>
                                            <h3 id='font1' className='text-lg text-white mb-1 hover:text-[var(--color-gold)] transition-colors'>{item.name}</h3>
                                        </Link>
                                        <p id='font2' className='text-[var(--color-gold)] text-sm mb-5'>
                                            {item.priceSmall} – {item.priceLarge}
                                        </p>
                                        <div className='flex gap-3'>
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                id='font2'
                                                aria-label={`Add ${item.name} to cart`}
                                                className='flex-1 py-3 bg-white text-black text-xs uppercase tracking-[0.15em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 rounded-lg flex items-center justify-center gap-2'
                                            >
                                                <IoBagOutline className='text-sm' />
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => removeFromFavorites(item.id)}
                                                aria-label={`Remove ${item.name} from favorites`}
                                                className='px-4 py-3 border border-white/20 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 rounded-lg group/btn'
                                            >
                                                <GoHeartFill className='text-red-400 group-hover/btn:text-red-500 transition-colors' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Favorites

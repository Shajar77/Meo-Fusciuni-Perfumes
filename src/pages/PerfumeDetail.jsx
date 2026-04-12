import { useState, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useCart } from '../context/CartContext'
import { perfumes } from '../data/perfumes'

const PerfumeDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedSize, setSelectedSize] = useState('large')
    const { addToCart, isFavorite, toggleFavorite } = useCart()

    // Memoize perfume lookup
    const perfume = useMemo(() => perfumes.find(p => p.id === parseInt(id)), [id])

    // Memoize computed values
    const currentPrice = useMemo(() => 
        selectedSize === 'small' ? perfume?.priceSmall : perfume?.priceLarge, 
        [selectedSize, perfume]
    )
    const isLiked = useMemo(() => isFavorite(parseInt(id)), [id, isFavorite])

    // Stable callback references
    const handleAddToCart = useCallback(() => {
        if (!perfume) return
        addToCart({
            id: perfume.id,
            name: perfume.name,
            price: currentPrice,
            size: selectedSize,
            sizeLabel: selectedSize === 'small' ? '30ml' : '100ml'
        })
        navigate('/cart')
    }, [perfume, currentPrice, selectedSize, addToCart, navigate])

    const handleToggleFavorite = useCallback(() => {
        if (!perfume) return
        toggleFavorite({
            id: perfume.id,
            name: perfume.name,
            priceSmall: `${perfume.priceSmall},00`,
            priceLarge: `${perfume.priceLarge},00`
        })
    }, [perfume, toggleFavorite])

    const handleSizeSelect = useCallback((size) => {
        setSelectedSize(size)
    }, [])

    if (!perfume) {
        return (
            <div className='w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-20 h-20 mx-auto mb-6 rounded-full border border-white/20 flex items-center justify-center'>
                        <span className='text-3xl'>?</span>
                    </div>
                    <h1 id='font1' className='text-2xl text-white mb-4'>Perfume Not Found</h1>
                    <p id='font3' className='text-gray-400 mb-8'>The fragrance you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/perfumes')}
                        id='font2'
                        className='px-8 py-3 bg-white text-black text-sm uppercase tracking-wider hover:bg-[var(--color-gold)] transition-colors'
                    >
                        Browse Collection
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full bg-[#faf9f7]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Product Section */}
                <section className='py-12 sm:py-16 lg:py-24'>
                    <div className='max-w-7xl mx-auto px-6'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>

                            {/* Product Image */}
                            <div className='relative'>
                                <div className='bg-gradient-to-br from-[#e8e8e8] to-[#d8d8d8] aspect-square lg:aspect-3/4 relative group overflow-hidden rounded-3xl shadow-2xl shadow-black/10'>
                                    <img
                                        src={perfume.image}
                                        alt={perfume.name}
                                        loading='eager'
                                        decoding='async'
                                        fetchPriority='high'
                                        className='w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105'
                                    />
                                </div>
                                {/* Wishlist Button */}
                                <button
                                    onClick={handleToggleFavorite}
                                    className={`absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50'}`}
                                >
                                    {isLiked ? <GoHeartFill className='text-2xl' /> : <GoHeart className='text-2xl' />}
                                </button>
                                {/* Badge */}
                                <div className='absolute top-6 left-6 bg-black text-white px-4 py-2 rounded-full'>
                                    <span id='font2' className='text-[10px] uppercase tracking-wider'>Bestseller</span>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className='flex flex-col justify-center lg:pl-8'>
                                <p id='font3' className='text-amber-700 text-sm uppercase tracking-[0.3em] mb-4'>Eau de Parfum</p>
                                <h1 id='font1' className='text-4xl sm:text-5xl lg:text-6xl text-black mb-6 leading-tight'>
                                    {perfume.name}
                                </h1>

                                {/* Price */}
                                <div className='mb-8'>
                                    <span id='font1' className='text-3xl sm:text-4xl text-black'>{currentPrice},00 €</span>
                                </div>

                                <p id='font3' className='text-gray-600 text-lg leading-relaxed mb-8'>
                                    {perfume.description}
                                </p>

                                {/* Story */}
                                <div className='bg-white p-6 rounded-2xl mb-8 border border-gray-100'>
                                    <p id='font3' className='text-gray-500 text-sm italic leading-relaxed'>
                                        "{perfume.story}"
                                    </p>
                                </div>

                                {/* Notes */}
                                <div className='mb-8'>
                                    <p id='font2' className='text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4'>Fragrance Notes</p>
                                    <div className='flex flex-wrap gap-3'>
                                        {perfume.notes.map((note, index) => (
                                            <span key={index} id='font3' className='px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm rounded-full hover:border-amber-400 hover:bg-amber-50 transition-all cursor-default'>
                                                {note}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Size Options */}
                                <div className='mb-8' role='group' aria-label='Select fragrance size'>
                                    <p id='font2' className='text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4'>Select Size</p>
                                    <div className='flex gap-4'>
                                        <button
                                            onClick={() => handleSizeSelect('small')}
                                            aria-pressed={selectedSize === 'small'}
                                            className={`flex-1 py-5 px-6 rounded-xl transition-all duration-300 ${selectedSize === 'small' ? 'bg-black text-white' : 'bg-white border border-gray-200 hover:border-black'}`}
                                        >
                                            <p id='font2' className='text-sm mb-1'>30ml</p>
                                            <p id='font3' className='text-lg'>{perfume.priceSmall},00</p>
                                        </button>
                                        <button
                                            onClick={() => handleSizeSelect('large')}
                                            aria-pressed={selectedSize === 'large'}
                                            className={`flex-1 py-5 px-6 rounded-xl transition-all duration-300 ${selectedSize === 'large' ? 'bg-black text-white' : 'bg-white border border-gray-200 hover:border-black'}`}
                                        >
                                            <p id='font2' className='text-sm mb-1'>100ml</p>
                                            <p id='font3' className='text-lg'>{perfume.priceLarge},00</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    id='font2'
                                    className='w-full py-5 bg-gradient-to-r from-black to-gray-800 text-white text-sm uppercase tracking-[0.25em] hover:from-amber-700 hover:to-amber-600 transition-all duration-500 rounded-xl shadow-xl shadow-black/20'
                                >
                                    Add to Cart • {currentPrice},00 €
                                </button>

                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}

export default PerfumeDetail

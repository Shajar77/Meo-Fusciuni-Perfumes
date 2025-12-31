import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useCart } from '../context/CartContext'

const PerfumeDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedSize, setSelectedSize] = useState('large')
    const { addToCart, isFavorite, toggleFavorite } = useCart()

    const perfumes = [
        { id: 1, name: 'Isola', priceSmall: 10, priceLarge: 220, description: 'A captivating journey to a sun-kissed Mediterranean island. Notes of sea salt, citrus bergamot, and warm amber create an unforgettable olfactory experience.', notes: ['Bergamot', 'Sea Salt', 'Amber', 'Sandalwood'], story: 'Inspired by the azure waters and golden sands of Sicily, Isola captures the essence of island life in every drop.' },
        { id: 2, name: '1# Nota di Viaggio', priceSmall: 8, priceLarge: 180, description: 'The first chapter of a travel memoir. Fresh green notes mingle with earthy undertones, evoking the excitement of new beginnings.', notes: ['Green Leaves', 'Vetiver', 'Moss', 'Cedar'], story: 'The beginning of every journey holds infinite possibilities. This scent marks the first step into the unknown.' },
        { id: 3, name: '2# Nota di Viaggio', priceSmall: 8, priceLarge: 180, description: 'A continuation of the journey. Spicy accords meet floral hearts in a dance of discovery and wonder.', notes: ['Pink Pepper', 'Rose', 'Oud', 'Musk'], story: 'As the journey unfolds, we discover new landscapes within ourselves.' },
        { id: 4, name: '3# Nota di Viaggio', priceSmall: 8, priceLarge: 180, description: 'The final destination. Rich, warm, and comforting notes that speak of homecoming and reflection.', notes: ['Vanilla', 'Tonka Bean', 'Leather', 'Incense'], story: 'Every journey must end, but the memories linger forever in the warmth of home.' },
        { id: 5, name: 'Notturno', priceSmall: 8, priceLarge: 180, description: 'A nocturnal symphony. Deep, mysterious, and seductive notes that capture the essence of the night.', notes: ['Black Pepper', 'Iris', 'Dark Woods', 'Ambergris'], story: 'When the sun sets, a different world awakens. Notturno is an ode to the beauty of darkness.' },
        { id: 6, name: 'Luce', priceSmall: 8, priceLarge: 180, description: 'Pure radiance in a bottle. Bright, luminous notes that celebrate the beauty of light and clarity.', notes: ['Neroli', 'White Tea', 'Jasmine', 'White Musk'], story: 'Light reveals truth. This fragrance celebrates the clarity that comes with understanding.' },
        { id: 7, name: 'Narcotico', priceSmall: 10, priceLarge: 220, description: 'An intoxicating elixir. Bold, addictive notes that leave an unforgettable impression.', notes: ['Tuberose', 'Ylang-Ylang', 'Benzoin', 'Vanilla Absolute'], story: 'Some experiences are so beautiful, they become addictive. Narcotico captures that intoxication.' },
        { id: 8, name: 'Odor 93', priceSmall: 10, priceLarge: 220, description: 'A memory from 1993. Nostalgic notes that transport you to cherished moments of the past.', notes: ['Fig Leaf', 'Coconut', 'Heliotrope', 'Sandalwood'], story: 'Every scent holds a memory. Odor 93 is a doorway to moments long past but never forgotten.' },
        { id: 9, name: 'Little Song', priceSmall: 8, priceLarge: 180, description: 'A delicate melody. Soft, poetic notes that whisper stories of innocence and joy.', notes: ['Mimosa', 'Violet', 'Honey', 'Powdery Musk'], story: 'In the quiet moments, we hear the little songs that make life beautiful.' },
        { id: 10, name: 'Magnificat', priceSmall: 10, priceLarge: 220, description: 'A hymn of praise. Majestic, sacred notes that elevate the spirit and inspire awe.', notes: ['Frankincense', 'Myrrh', 'Rose Otto', 'Labdanum'], story: 'A prayer in fragrance form, Magnificat lifts the soul to heights unknown.' },
        { id: 11, name: "L'Oblio", priceSmall: 8, priceLarge: 180, description: 'The art of forgetting. Ethereal notes that help release the past and embrace the present.', notes: ['Lavender', 'Sage', 'Palo Santo', 'Cotton'], story: 'Sometimes, forgetting is a gift. L\'Oblio offers peace through release.' },
        { id: 12, name: 'Oro Rosso', priceSmall: 10, priceLarge: 220, description: 'Red gold. Precious, warm notes that speak of luxury, passion, and timeless elegance.', notes: ['Saffron', 'Rose Absolute', 'Oud', 'Amber'], story: 'The most precious things in life are not measured in gold, but in moments.' },
        { id: 13, name: 'Venezia', priceSmall: 10, priceLarge: 220, description: 'The essence of Venice. Mysterious, romantic notes that capture the magic of the floating city.', notes: ['Iris Pallida', 'Orris Root', 'Aquatic Notes', 'Musk'], story: 'Venice exists in a dream. This fragrance captures its ethereal beauty.' },
        { id: 14, name: 'Roma', priceSmall: 8, priceLarge: 180, description: 'Eternal city vibes. Classic, sophisticated notes that embody Roman elegance and history.', notes: ['Neroli', 'Orange Blossom', 'Roman Chamomile', 'Cedarwood'], story: 'All roads lead to Roma. All stories find their meaning here.' },
        { id: 15, name: 'Firenze', priceSmall: 10, priceLarge: 220, description: 'Renaissance beauty. Artistic, refined notes inspired by the cradle of art and culture.', notes: ['Iris', 'Violet Leaf', 'Leather', 'Powdery Notes'], story: 'Where art was reborn, beauty found its truest expression.' },
        { id: 16, name: 'Milano', priceSmall: 8, priceLarge: 180, description: 'Fashion forward. Modern, sleek notes that capture the spirit of Italian design.', notes: ['Bergamot', 'Green Apple', 'White Woods', 'Clean Musk'], story: 'Style is not just what you wear, but how you make the world feel.' },
        { id: 17, name: 'Napoli', priceSmall: 10, priceLarge: 220, description: 'Southern passion. Vibrant, warm notes that celebrate life, love, and Mediterranean spirit.', notes: ['Lemon Zest', 'Basil', 'Marine Notes', 'Warm Woods'], story: 'Napoli beats with a heart of fire. This fragrance captures its passionate soul.' },
        { id: 18, name: 'Palermo', priceSmall: 8, priceLarge: 180, description: 'Sicilian dreams. Sun-drenched notes that tell stories of ancient traditions and natural beauty.', notes: ['Blood Orange', 'Almond', 'Jasmine', 'Vanilla'], story: 'Under the Sicilian sun, ancient secrets whisper through the orange groves.' },
    ]

    const perfume = perfumes.find(p => p.id === parseInt(id))

    if (!perfume) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center'>
                <p>Perfume not found</p>
            </div>
        )
    }

    const currentPrice = selectedSize === 'small' ? perfume.priceSmall : perfume.priceLarge
    const isLiked = isFavorite(parseInt(id))

    const handleAddToCart = () => {
        addToCart({
            id: perfume.id,
            name: perfume.name,
            price: currentPrice,
            size: selectedSize,
            sizeLabel: selectedSize === 'small' ? '30ml' : '100ml'
        })
        navigate('/cart')
    }

    const handleToggleFavorite = () => {
        toggleFavorite({
            id: perfume.id,
            name: perfume.name,
            priceSmall: `${perfume.priceSmall},00 €`,
            priceLarge: `${perfume.priceLarge},00 €`
        })
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
                                        src='https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/07/Meo-Fusciuni-Sito-Still-Life-rfer.001-683x908.jpeg'
                                        alt={perfume.name}
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
                                <div className='mb-8'>
                                    <p id='font2' className='text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4'>Select Size</p>
                                    <div className='flex gap-4'>
                                        <button
                                            onClick={() => setSelectedSize('small')}
                                            className={`flex-1 py-5 px-6 rounded-xl transition-all duration-300 ${selectedSize === 'small' ? 'bg-black text-white' : 'bg-white border border-gray-200 hover:border-black'}`}
                                        >
                                            <p id='font2' className='text-sm mb-1'>30ml</p>
                                            <p id='font3' className='text-lg'>{perfume.priceSmall},00 €</p>
                                        </button>
                                        <button
                                            onClick={() => setSelectedSize('large')}
                                            className={`flex-1 py-5 px-6 rounded-xl transition-all duration-300 ${selectedSize === 'large' ? 'bg-black text-white' : 'bg-white border border-gray-200 hover:border-black'}`}
                                        >
                                            <p id='font2' className='text-sm mb-1'>100ml</p>
                                            <p id='font3' className='text-lg'>{perfume.priceLarge},00 €</p>
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

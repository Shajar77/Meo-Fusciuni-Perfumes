import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { IoBagOutline } from "react-icons/io5";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()
    const shipping = cartTotal >= 150 ? 0 : 15

    const handleCheckout = () => {
        if (cartItems.length > 0) {
            // Navigate to checkout with first item for now
            navigate(`/checkout/${cartItems[0].id}?size=${cartItems[0].size}`)
        }
    }

    return (
        <div className='w-full min-h-screen bg-[#f8f8f8]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Header */}
                <div className='bg-white border-b border-gray-200 py-12 sm:py-16'>
                    <div className='max-w-6xl mx-auto px-6 text-center'>
                        <IoBagOutline className='text-4xl mx-auto mb-4' />
                        <h1 id='font1' className='text-3xl sm:text-4xl lg:text-5xl mb-4'>
                            Shopping Cart
                        </h1>
                        <p id='font3' className='text-gray-500'>
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-6xl mx-auto px-6 py-12 sm:py-16'>
                    {cartItems.length === 0 ? (
                        <div className='text-center py-20 bg-white rounded-lg'>
                            <IoBagOutline className='text-6xl text-gray-300 mx-auto mb-6' />
                            <h2 id='font2' className='text-xl uppercase tracking-wider mb-4'>Your cart is empty</h2>
                            <p id='font3' className='text-gray-500 mb-8'>Add some beautiful fragrances to get started</p>
                            <Link
                                to='/Perfumes'
                                id='font2'
                                className='inline-block px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors'
                            >
                                Shop Perfumes
                            </Link>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                            {/* Cart Items */}
                            <div className='lg:col-span-2 space-y-4'>
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className='bg-white p-6 rounded-lg shadow-sm flex gap-6'>
                                        <Link to={`/perfume/${item.id}`} className='w-24 h-24 bg-[#e8e8e8] rounded-lg overflow-hidden flex-shrink-0'>
                                            <img
                                                src='https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/07/Meo-Fusciuni-Sito-Still-Life-rfer.001-683x908.jpeg'
                                                alt={item.name}
                                                className='w-full h-full object-contain'
                                            />
                                        </Link>
                                        <div className='flex-1'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <div>
                                                    <Link to={`/perfume/${item.id}`}>
                                                        <h3 id='font1' className='text-lg hover:text-amber-700 transition-colors'>{item.name}</h3>
                                                    </Link>
                                                    <p id='font3' className='text-sm text-gray-500'>{item.sizeLabel}</p>
                                                </div>
                                                <p id='font2' className='text-amber-700'>{item.price},00 €</p>
                                            </div>
                                            <div className='flex justify-between items-center mt-4'>
                                                <div className='flex items-center border border-gray-200 rounded'>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        className='px-4 py-2 hover:bg-gray-100 transition-colors'
                                                    >
                                                        −
                                                    </button>
                                                    <span id='font2' className='px-4 py-2'>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className='px-4 py-2 hover:bg-gray-100 transition-colors'
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    id='font3'
                                                    className='text-sm text-red-500 hover:text-red-700 transition-colors'
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={clearCart}
                                    id='font3'
                                    className='text-sm text-gray-500 hover:text-red-500 transition-colors mt-4'
                                >
                                    Clear Cart
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className='lg:col-span-1'>
                                <div className='bg-white p-6 sm:p-8 rounded-lg shadow-sm sticky top-24'>
                                    <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Order Summary</h2>

                                    <div className='space-y-3 pb-6 border-b border-gray-100'>
                                        <div className='flex justify-between'>
                                            <span id='font3' className='text-gray-600'>Subtotal</span>
                                            <span id='font2'>{cartTotal},00 €</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span id='font3' className='text-gray-600'>Shipping</span>
                                            <span id='font2' className={shipping === 0 ? 'text-green-600' : ''}>
                                                {shipping === 0 ? 'Free' : `${shipping},00 €`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='pt-6 pb-6'>
                                        <div className='flex justify-between items-center'>
                                            <span id='font2' className='text-lg'>Total</span>
                                            <span id='font1' className='text-2xl'>{cartTotal + shipping},00 €</span>
                                        </div>
                                    </div>

                                    {shipping > 0 && (
                                        <p id='font3' className='text-xs text-gray-500 mb-6'>
                                            Add {150 - cartTotal},00 € more for free shipping
                                        </p>
                                    )}

                                    <button
                                        onClick={handleCheckout}
                                        id='font2'
                                        className='w-full py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors'
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className='mt-6 pt-6 border-t border-gray-100 text-center'>
                                        <p id='font3' className='text-xs text-gray-500 flex items-center justify-center gap-2'>
                                            <span>🔒</span> Secure checkout
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Cart

import { useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import { useCart } from '../context/CartContext'
import { IoBagOutline, IoTrashOutline } from "react-icons/io5";
import { getPerfumeById } from '../data/perfumes'

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()
    const navigate = useNavigate()
    const shipping = useMemo(() => cartTotal >= 150 ? 0 : 15, [cartTotal])

    const handleCheckout = useCallback(() => {
        if (cartItems.length > 0) {
            navigate(`/checkout/${cartItems[0].id}?size=${cartItems[0].size}`)
        }
    }, [cartItems, navigate])

    return (
        <div className='w-full min-h-screen bg-[#0a0a0a]'>
            <div className='w-full'>

                {/* Header */}
                <div className='relative py-16 sm:py-24 border-b border-white/10'>
                    <div className='max-w-6xl mx-auto px-6 text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full border border-[var(--color-gold)]/30 mb-6'>
                            <IoBagOutline className='text-2xl text-[var(--color-gold)]' />
                        </div>
                        <h1 id='font1' className='text-3xl sm:text-4xl lg:text-5xl text-white mb-4'>
                            Shopping Cart
                        </h1>
                        <p id='font3' className='text-gray-400'>
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20'>
                    {cartItems.length === 0 ? (
                        <div className='text-center py-24 bg-white/5 rounded-xl border border-white/10'>
                            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full border border-white/20 mb-8'>
                                <IoBagOutline className='text-3xl text-white/40' />
                            </div>
                            <h2 id='font2' className='text-xl uppercase tracking-[0.2em] text-white mb-4'>Your cart is empty</h2>
                            <p id='font3' className='text-gray-500 mb-10'>Discover our exclusive collection of fine fragrances</p>
                            <Link
                                to='/perfumes'
                                id='font2'
                                className='inline-block px-10 py-4 bg-white text-black text-sm uppercase tracking-[0.15em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300'
                            >
                                Explore Collection
                            </Link>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Cart Items */}
                            <div className='lg:col-span-2 space-y-4'>
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className='bg-white/5 border border-white/10 p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row gap-5 sm:gap-6 group hover:border-[var(--color-gold)]/30 transition-all duration-300'>
                                        <Link to={`/perfume/${item.id}`} className='w-24 h-24 sm:w-28 sm:h-28 bg-[#1a1a1a] rounded-lg overflow-hidden flex-shrink-0'>
                                            <img
                                                src={getPerfumeById(item.id)?.image || '/logo.png'}
                                                alt={item.name}
                                                loading='lazy'
                                                decoding='async'
                                                fetchPriority='low'
                                                className='w-full h-full object-contain p-2'
                                            />
                                        </Link>
                                        <div className='flex-1'>
                                            <div className='flex justify-between items-start mb-3'>
                                                <div>
                                                    <Link to={`/perfume/${item.id}`}>
                                                        <h3 id='font1' className='text-lg text-white hover:text-[var(--color-gold)] transition-colors'>{item.name}</h3>
                                                    </Link>
                                                    <p id='font3' className='text-sm text-gray-500 mt-1'>{item.sizeLabel}</p>
                                                </div>
                                                <p id='font2' className='text-[var(--color-gold)] text-lg'>{item.price},00 €</p>
                                            </div>
                                            <div className='flex flex-wrap justify-between items-center mt-5 gap-3'>
                                                <div className='flex items-center border border-white/20 rounded-lg'>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        className='px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 transition-colors'
                                                        id='font2'
                                                        aria-label={`Decrease ${item.name} quantity`}
                                                    >
                                                        −
                                                    </button>
                                                    <span id='font2' className='px-4 py-2.5 text-white min-w-[3rem] text-center' aria-live='polite'>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className='px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/5 transition-colors'
                                                        id='font2'
                                                        aria-label={`Increase ${item.name} quantity`}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    className='flex items-center gap-2 text-sm text-red-400/70 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-red-500/10'
                                                    id='font3'
                                                    aria-label={`Remove ${item.name} from cart`}
                                                >
                                                    <IoTrashOutline className='text-base' />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={clearCart}
                                    id='font3'
                                    className='flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors mt-6 px-4 py-2 rounded-lg hover:bg-white/5'
                                >
                                    <IoTrashOutline />
                                    Clear Cart
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className='lg:col-span-1'>
                                <div className='bg-white/5 border border-white/10 p-6 sm:p-8 rounded-xl lg:sticky lg:top-24'>
                                    <h2 id='font2' className='text-lg uppercase tracking-[0.2em] text-white mb-6'>Order Summary</h2>

                                    <div className='space-y-4 pb-6 border-b border-white/10'>
                                        <div className='flex justify-between'>
                                            <span id='font3' className='text-gray-400'>Subtotal</span>
                                            <span id='font2' className='text-white'>{cartTotal},00 €</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span id='font3' className='text-gray-400'>Shipping</span>
                                            <span id='font2' className={shipping === 0 ? 'text-[var(--color-gold)]' : 'text-white'}>
                                                {shipping === 0 ? 'Free' : `${shipping},00 €`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='pt-6 pb-6'>
                                        <div className='flex justify-between items-center'>
                                            <span id='font2' className='text-lg text-white'>Total</span>
                                            <span id='font1' className='text-2xl text-[var(--color-gold)]'>{cartTotal + shipping},00 €</span>
                                        </div>
                                    </div>

                                    {shipping > 0 && (
                                        <div className='mb-6 p-4 bg-[var(--color-gold)]/10 rounded-lg border border-[var(--color-gold)]/20'>
                                            <p id='font3' className='text-xs text-[var(--color-gold)]'>
                                                Add {150 - cartTotal},00 € more for free shipping
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleCheckout}
                                        id='font2'
                                        className='w-full py-4 bg-white text-black text-sm uppercase tracking-[0.15em] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 rounded-lg'
                                    >
                                        Proceed to Checkout
                                    </button>

                                    <div className='mt-6 pt-6 border-t border-white/10 text-center'>
                                        <p id='font3' className='text-xs text-gray-500 flex items-center justify-center gap-2'>
                                            <span className='text-[var(--color-gold)]'>🔒</span> Secure checkout
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart

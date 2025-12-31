import React, { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { createOrder, initiateJazzCashPayment, initiateEasypaisaPayment, initiateCODPayment } from '../services/paymentService'

const Checkout = () => {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const size = searchParams.get('size') || 'large'

    const [paymentMethod, setPaymentMethod] = useState('jazzcash')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Pakistan'
    })

    const perfumes = [
        { id: 1, name: 'Isola', priceSmall: 10, priceLarge: 220 },
        { id: 2, name: '1# Nota di Viaggio', priceSmall: 8, priceLarge: 180 },
        { id: 3, name: '2# Nota di Viaggio', priceSmall: 8, priceLarge: 180 },
        { id: 4, name: '3# Nota di Viaggio', priceSmall: 8, priceLarge: 180 },
        { id: 5, name: 'Notturno', priceSmall: 8, priceLarge: 180 },
        { id: 6, name: 'Luce', priceSmall: 8, priceLarge: 180 },
        { id: 7, name: 'Narcotico', priceSmall: 10, priceLarge: 220 },
        { id: 8, name: 'Odor 93', priceSmall: 10, priceLarge: 220 },
        { id: 9, name: 'Little Song', priceSmall: 8, priceLarge: 180 },
        { id: 10, name: 'Magnificat', priceSmall: 10, priceLarge: 220 },
        { id: 11, name: "L'Oblio", priceSmall: 8, priceLarge: 180 },
        { id: 12, name: 'Oro Rosso', priceSmall: 10, priceLarge: 220 },
        { id: 13, name: 'Venezia', priceSmall: 10, priceLarge: 220 },
        { id: 14, name: 'Roma', priceSmall: 8, priceLarge: 180 },
        { id: 15, name: 'Firenze', priceSmall: 10, priceLarge: 220 },
        { id: 16, name: 'Milano', priceSmall: 8, priceLarge: 180 },
        { id: 17, name: 'Napoli', priceSmall: 10, priceLarge: 220 },
        { id: 18, name: 'Palermo', priceSmall: 8, priceLarge: 180 },
    ]

    const perfume = perfumes.find(p => p.id === parseInt(id))
    const price = size === 'small' ? perfume?.priceSmall : perfume?.priceLarge
    const sizeLabel = size === 'small' ? '30ml' : '100ml'
    const shipping = price >= 150 ? 0 : 15
    const codFee = paymentMethod === 'cod' ? 50 : 0
    const total = price + shipping + codFee

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Create order data
            const orderData = {
                userId: user?.uid || null,
                customerName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                country: formData.country,
                items: [{
                    productId: perfume.id,
                    name: perfume.name,
                    size: sizeLabel,
                    price: price,
                    quantity: 1
                }],
                subtotal: price,
                shipping: shipping,
                codFee: codFee,
                total: total,
                paymentMethod: paymentMethod
            }

            // Create order in Firestore
            const orderResult = await createOrder(orderData)
            if (!orderResult.success) {
                throw new Error(orderResult.error)
            }

            // Initiate payment based on method
            let paymentResult
            if (paymentMethod === 'jazzcash') {
                paymentResult = await initiateJazzCashPayment({
                    orderId: orderResult.orderId,
                    amount: total
                })
            } else if (paymentMethod === 'easypaisa') {
                paymentResult = await initiateEasypaisaPayment({
                    orderId: orderResult.orderId,
                    amount: total
                })
            } else {
                paymentResult = await initiateCODPayment({
                    orderId: orderResult.orderId,
                    amount: total
                })
            }

            // Navigate to confirmation page with order details
            navigate('/order-confirmation', {
                state: {
                    orderId: orderResult.orderId,
                    docId: orderResult.docId,
                    paymentInstructions: paymentResult.instructions,
                    orderData: orderData
                }
            })
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Error placing order: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!perfume) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center'>
                <p>Product not found</p>
            </div>
        )
    }

    return (
        <div className='w-full bg-[#f8f8f8]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Header */}
                <div className='bg-black py-12 sm:py-16'>
                    <div className='max-w-6xl mx-auto px-6 text-center'>
                        <p id='font3' className='text-amber-400/80 text-xs uppercase tracking-[0.3em] mb-4'>Secure Checkout</p>
                        <h1 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl'>
                            Complete Your Order
                        </h1>
                    </div>
                </div>

                {/* Checkout Content */}
                <div className='max-w-6xl mx-auto px-6 py-12 sm:py-16'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16'>

                        {/* Form Section */}
                        <div className='lg:col-span-2'>
                            <form onSubmit={handleSubmit} className='space-y-8'>

                                {/* Contact Information */}
                                <div className='bg-white p-6 sm:p-8 rounded-lg shadow-sm'>
                                    <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Contact Information</h2>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>First Name</label>
                                            <input
                                                type='text'
                                                name='firstName'
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                id='font3'
                                                className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                            />
                                        </div>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>Last Name</label>
                                            <input
                                                type='text'
                                                name='lastName'
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                id='font3'
                                                className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                            />
                                        </div>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>Email</label>
                                            <input
                                                type='email'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                id='font3'
                                                className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                            />
                                        </div>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>Phone</label>
                                            <input
                                                type='tel'
                                                name='phone'
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                id='font3'
                                                className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className='bg-white p-6 sm:p-8 rounded-lg shadow-sm'>
                                    <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Shipping Address</h2>
                                    <div className='space-y-6'>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>Address</label>
                                            <input
                                                type='text'
                                                name='address'
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                id='font3'
                                                className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                                            <div>
                                                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>City</label>
                                                <input
                                                    type='text'
                                                    name='city'
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    required
                                                    id='font3'
                                                    className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                                />
                                            </div>
                                            <div>
                                                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>Postal Code</label>
                                                <input
                                                    type='text'
                                                    name='postalCode'
                                                    value={formData.postalCode}
                                                    onChange={handleInputChange}
                                                    required
                                                    id='font3'
                                                    className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                                />
                                            </div>
                                            <div>
                                                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>Country</label>
                                                <select
                                                    name='country'
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    id='font3'
                                                    className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black transition-colors'
                                                >
                                                    <option value='Pakistan'>Pakistan</option>
                                                    <option value='UAE'>UAE</option>
                                                    <option value='Saudi Arabia'>Saudi Arabia</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className='bg-white p-6 sm:p-8 rounded-lg shadow-sm'>
                                    <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Payment Method</h2>

                                    {/* Payment Options */}
                                    <div className='flex flex-wrap gap-4 mb-6'>
                                        <button
                                            type='button'
                                            onClick={() => setPaymentMethod('jazzcash')}
                                            className={`flex items-center gap-3 px-6 py-3 border rounded-lg transition-all ${paymentMethod === 'jazzcash' ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}
                                        >
                                            <span>📱</span>
                                            <span id='font2' className='text-sm'>JazzCash</span>
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => setPaymentMethod('easypaisa')}
                                            className={`flex items-center gap-3 px-6 py-3 border rounded-lg transition-all ${paymentMethod === 'easypaisa' ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}
                                        >
                                            <span>📲</span>
                                            <span id='font2' className='text-sm'>Easypaisa</span>
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => setPaymentMethod('cod')}
                                            className={`flex items-center gap-3 px-6 py-3 border rounded-lg transition-all ${paymentMethod === 'cod' ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}
                                        >
                                            <span>💵</span>
                                            <span id='font2' className='text-sm'>Cash on Delivery</span>
                                        </button>
                                    </div>

                                    {/* Payment Info */}
                                    {paymentMethod === 'jazzcash' && (
                                        <div className='bg-red-50 p-4 rounded-lg'>
                                            <p id='font3' className='text-red-800 text-sm'>
                                                After placing your order, you'll receive JazzCash payment instructions.
                                            </p>
                                        </div>
                                    )}
                                    {paymentMethod === 'easypaisa' && (
                                        <div className='bg-green-50 p-4 rounded-lg'>
                                            <p id='font3' className='text-green-800 text-sm'>
                                                After placing your order, you'll receive Easypaisa payment instructions.
                                            </p>
                                        </div>
                                    )}
                                    {paymentMethod === 'cod' && (
                                        <div className='bg-amber-50 p-4 rounded-lg'>
                                            <p id='font3' className='text-amber-800 text-sm'>
                                                Pay with cash when your order is delivered. A COD fee of 50 PKR applies.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    id='font2'
                                    className='w-full py-5 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-amber-700 transition-colors duration-500 rounded-lg disabled:opacity-50'
                                >
                                    {loading ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                                            Processing...
                                        </span>
                                    ) : (
                                        `Place Order • ${total.toFixed(2)} €`
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white p-6 sm:p-8 rounded-lg shadow-sm sticky top-24'>
                                <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Order Summary</h2>

                                {/* Product */}
                                <div className='flex gap-4 pb-6 border-b border-gray-100'>
                                    <div className='w-20 h-20 bg-[#e8e8e8] rounded overflow-hidden'>
                                        <img
                                            src='https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/07/Meo-Fusciuni-Sito-Still-Life-rfer.001-683x908.jpeg'
                                            alt={perfume.name}
                                            className='w-full h-full object-contain'
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <p id='font1' className='text-base mb-1'>{perfume.name}</p>
                                        <p id='font3' className='text-sm text-gray-500'>Eau de Parfum • {sizeLabel}</p>
                                        <p id='font2' className='text-amber-700 mt-2'>{price},00 €</p>
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className='py-6 space-y-3'>
                                    <div className='flex justify-between'>
                                        <span id='font3' className='text-gray-600'>Subtotal</span>
                                        <span id='font2'>{price},00 €</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span id='font3' className='text-gray-600'>Shipping</span>
                                        <span id='font2'>{shipping === 0 ? 'Free' : `${shipping},00 €`}</span>
                                    </div>
                                    {codFee > 0 && (
                                        <div className='flex justify-between'>
                                            <span id='font3' className='text-gray-600'>COD Fee</span>
                                            <span id='font2'>{codFee},00 PKR</span>
                                        </div>
                                    )}
                                </div>

                                <div className='pt-4 border-t border-gray-200'>
                                    <div className='flex justify-between items-center'>
                                        <span id='font2' className='text-lg'>Total</span>
                                        <span id='font1' className='text-2xl'>{total},00 €</span>
                                    </div>
                                </div>

                                {/* Secure Checkout Badge */}
                                <div className='mt-6 pt-6 border-t border-gray-100 text-center'>
                                    <p id='font3' className='text-xs text-gray-500 flex items-center justify-center gap-2'>
                                        <span>🔒</span> Secure checkout powered by Firebase
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Checkout

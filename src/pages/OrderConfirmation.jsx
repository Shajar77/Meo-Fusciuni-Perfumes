import React from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OrderConfirmation = () => {
    const location = useLocation()
    const { orderId, paymentInstructions, orderData } = location.state || {}

    if (!orderId) {
        return <Navigate to='/' replace />
    }

    return (
        <div className='w-full min-h-screen bg-[#f8f8f8]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Success Header */}
                <div className='bg-green-600 py-12 sm:py-16'>
                    <div className='max-w-4xl mx-auto px-6 text-center'>
                        <span className='text-5xl mb-4 block'>✓</span>
                        <h1 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl mb-4'>
                            Order Placed Successfully!
                        </h1>
                        <p id='font3' className='text-white/80 text-lg'>
                            Order ID: <span className='font-bold'>{orderId}</span>
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-4xl mx-auto px-6 py-12 sm:py-16'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

                        {/* Payment Instructions */}
                        <div className='bg-white p-6 sm:p-8 rounded-xl shadow-sm'>
                            <h2 id='font2' className='text-lg uppercase tracking-wider mb-6 flex items-center gap-2'>
                                <span>{paymentInstructions?.method === 'JazzCash' ? '📱' : paymentInstructions?.method === 'Easypaisa' ? '📲' : '💵'}</span>
                                Payment Instructions
                            </h2>

                            {paymentInstructions?.method !== 'Cash on Delivery' ? (
                                <>
                                    <div className='bg-amber-50 p-4 rounded-lg mb-6'>
                                        <p id='font2' className='text-amber-800 text-sm mb-2'>Send payment to:</p>
                                        <p id='font1' className='text-amber-900 text-xl'>{paymentInstructions?.accountNumber}</p>
                                        <p id='font3' className='text-amber-700 text-sm'>{paymentInstructions?.accountTitle}</p>
                                    </div>

                                    <div className='space-y-3'>
                                        {paymentInstructions?.steps?.map((step, index) => (
                                            <div key={index} className='flex gap-3'>
                                                <span className='w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs flex-shrink-0'>
                                                    {index + 1}
                                                </span>
                                                <p id='font3' className='text-sm text-gray-700'>{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className='space-y-4'>
                                    {paymentInstructions?.steps?.map((step, index) => (
                                        <div key={index} className='flex gap-3'>
                                            <span className='w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0'>
                                                ✓
                                            </span>
                                            <p id='font3' className='text-sm text-gray-700'>{step}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className='bg-white p-6 sm:p-8 rounded-xl shadow-sm'>
                            <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Order Details</h2>

                            <div className='space-y-4 pb-6 border-b border-gray-100'>
                                <div>
                                    <p id='font2' className='text-xs uppercase tracking-wider text-gray-500'>Shipping To</p>
                                    <p id='font3' className='text-sm text-gray-800'>{orderData?.customerName}</p>
                                    <p id='font3' className='text-sm text-gray-600'>{orderData?.address}</p>
                                    <p id='font3' className='text-sm text-gray-600'>{orderData?.city}, {orderData?.postalCode}</p>
                                    <p id='font3' className='text-sm text-gray-600'>{orderData?.phone}</p>
                                </div>
                            </div>

                            <div className='py-6 border-b border-gray-100'>
                                <p id='font2' className='text-xs uppercase tracking-wider text-gray-500 mb-4'>Items</p>
                                {orderData?.items?.map((item, index) => (
                                    <div key={index} className='flex justify-between items-center'>
                                        <div>
                                            <p id='font1' className='text-base'>{item.name}</p>
                                            <p id='font3' className='text-sm text-gray-500'>{item.size}</p>
                                        </div>
                                        <p id='font2'>{item.price},00 €</p>
                                    </div>
                                ))}
                            </div>

                            <div className='pt-6 space-y-2'>
                                <div className='flex justify-between'>
                                    <span id='font3' className='text-gray-600'>Subtotal</span>
                                    <span id='font2'>{orderData?.subtotal},00 €</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span id='font3' className='text-gray-600'>Shipping</span>
                                    <span id='font2'>{orderData?.shipping === 0 ? 'Free' : `${orderData?.shipping},00 €`}</span>
                                </div>
                                {orderData?.codFee > 0 && (
                                    <div className='flex justify-between'>
                                        <span id='font3' className='text-gray-600'>COD Fee</span>
                                        <span id='font2'>{orderData?.codFee} PKR</span>
                                    </div>
                                )}
                                <div className='flex justify-between pt-4 border-t border-gray-200'>
                                    <span id='font2' className='text-lg'>Total</span>
                                    <span id='font1' className='text-2xl'>{orderData?.total},00 €</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                        <Link
                            to='/Perfumes'
                            id='font2'
                            className='flex-1 py-4 bg-black text-white text-center text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors rounded-lg'
                        >
                            Continue Shopping
                        </Link>
                        <Link
                            to='/'
                            id='font2'
                            className='flex-1 py-4 border border-gray-300 text-center text-sm uppercase tracking-wider hover:border-black transition-colors rounded-lg'
                        >
                            Back to Home
                        </Link>
                    </div>

                    {/* Note */}
                    <div className='bg-blue-50 p-4 rounded-lg mt-8 text-center'>
                        <p id='font3' className='text-blue-800 text-sm'>
                            📧 A confirmation email has been sent to <strong>{orderData?.email}</strong>
                        </p>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default OrderConfirmation

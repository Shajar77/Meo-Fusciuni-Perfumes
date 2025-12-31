import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MyOrders = () => {
    const { user } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user])

    const fetchOrders = async () => {
        try {
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', user.uid),
                orderBy('createdAt', 'desc')
            )
            const snapshot = await getDocs(q)
            setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700'
            case 'processing': return 'bg-blue-100 text-blue-700'
            case 'shipped': return 'bg-purple-100 text-purple-700'
            case 'cancelled': return 'bg-red-100 text-red-700'
            default: return 'bg-amber-100 text-amber-700'
        }
    }

    return (
        <div className='w-full min-h-screen bg-[#f8f8f8]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Header */}
                <div className='bg-black py-12 sm:py-16'>
                    <div className='max-w-4xl mx-auto px-6 text-center'>
                        <p id='font3' className='text-amber-400/80 text-xs uppercase tracking-[0.3em] mb-4'>Your Account</p>
                        <h1 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl'>
                            My Orders
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-4xl mx-auto px-6 py-12 sm:py-16'>
                    {loading ? (
                        <div className='text-center py-12'>
                            <div className='w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4'></div>
                            <p id='font3' className='text-gray-500'>Loading orders...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className='text-center py-12 bg-white rounded-xl'>
                            <span className='text-5xl mb-4 block'>📦</span>
                            <h2 id='font2' className='text-xl uppercase tracking-wider mb-4'>No orders yet</h2>
                            <p id='font3' className='text-gray-500 mb-8'>Start shopping to see your orders here</p>
                            <Link
                                to='/Perfumes'
                                id='font2'
                                className='inline-block px-8 py-4 bg-black text-white text-sm uppercase tracking-wider hover:bg-amber-700 transition-colors'
                            >
                                Shop Perfumes
                            </Link>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {orders.map((order) => (
                                <div key={order.id} className='bg-white rounded-xl p-6 shadow-sm'>
                                    <div className='flex flex-wrap justify-between items-start gap-4 mb-4'>
                                        <div>
                                            <p id='font2' className='text-sm uppercase tracking-wider'>Order #{order.orderId || order.id.slice(0, 8)}</p>
                                            <p id='font3' className='text-sm text-gray-500'>
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'long', day: 'numeric'
                                                }) : 'N/A'}
                                            </p>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                            {order.status || 'pending'}
                                        </span>
                                    </div>

                                    {/* Items */}
                                    <div className='border-t border-gray-100 pt-4'>
                                        {order.items?.map((item, index) => (
                                            <div key={index} className='flex justify-between items-center py-2'>
                                                <div>
                                                    <p id='font1' className='text-base'>{item.name}</p>
                                                    <p id='font3' className='text-sm text-gray-500'>{item.size} × {item.quantity || 1}</p>
                                                </div>
                                                <p id='font2'>{item.price},00 €</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total */}
                                    <div className='border-t border-gray-100 pt-4 mt-4 flex justify-between items-center'>
                                        <p id='font2' className='text-sm text-gray-500'>Total</p>
                                        <p id='font1' className='text-xl'>{order.total},00 €</p>
                                    </div>

                                    {/* Payment Method */}
                                    <div className='mt-4 pt-4 border-t border-gray-100'>
                                        <p id='font3' className='text-sm text-gray-500'>
                                            Payment: <span className='capitalize'>{order.paymentMethod}</span>
                                        </p>
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

export default MyOrders

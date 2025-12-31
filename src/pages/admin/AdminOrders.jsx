import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import Navbar from '../../components/Navbar'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), {
                status: newStatus,
                updatedAt: new Date().toISOString()
            })
            fetchOrders()
            setSelectedOrder(null)
        } catch (error) {
            console.error('Error updating order:', error)
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
        <div className='w-full min-h-screen bg-gray-50'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    {/* Header */}
                    <div className='mb-8'>
                        <Link to='/admin' id='font3' className='text-amber-700 hover:underline text-sm'>← Back to Dashboard</Link>
                        <h1 id='font1' className='text-3xl sm:text-4xl mt-2'>Manage Orders</h1>
                    </div>

                    {/* Orders Table */}
                    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                        {loading ? (
                            <p id='font3' className='text-gray-500 text-center py-12'>Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <p id='font3' className='text-gray-500 text-center py-12'>No orders yet</p>
                        ) : (
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Order ID</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Customer</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Items</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Total</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Payment</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Status</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Date</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className='border-t border-gray-100 hover:bg-gray-50'>
                                            <td id='font3' className='py-4 px-6 text-sm'>#{order.id.slice(0, 8)}</td>
                                            <td className='py-4 px-6'>
                                                <p id='font3' className='text-sm'>{order.customerName}</p>
                                                <p id='font3' className='text-xs text-gray-500'>{order.email}</p>
                                            </td>
                                            <td id='font3' className='py-4 px-6 text-sm'>{order.items?.length || 1} item(s)</td>
                                            <td id='font2' className='py-4 px-6 text-sm'>{order.total?.toFixed(2)} €</td>
                                            <td id='font3' className='py-4 px-6 text-sm capitalize'>{order.paymentMethod}</td>
                                            <td className='py-4 px-6'>
                                                <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                                    {order.status || 'pending'}
                                                </span>
                                            </td>
                                            <td id='font3' className='py-4 px-6 text-sm text-gray-500'>
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className='py-4 px-6'>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className='text-blue-600 hover:underline text-sm'
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className='fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4'>
                    <div className='bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto'>
                        <div className='p-6'>
                            <h2 id='font1' className='text-2xl mb-6'>Order #{selectedOrder.id.slice(0, 8)}</h2>

                            <div className='space-y-4 mb-6'>
                                <div>
                                    <p id='font2' className='text-xs uppercase tracking-wider text-gray-500'>Customer</p>
                                    <p id='font3' className='text-base'>{selectedOrder.customerName}</p>
                                    <p id='font3' className='text-sm text-gray-500'>{selectedOrder.email}</p>
                                    <p id='font3' className='text-sm text-gray-500'>{selectedOrder.phone}</p>
                                </div>
                                <div>
                                    <p id='font2' className='text-xs uppercase tracking-wider text-gray-500'>Shipping Address</p>
                                    <p id='font3' className='text-sm'>{selectedOrder.address}</p>
                                    <p id='font3' className='text-sm'>{selectedOrder.city}, {selectedOrder.postalCode}</p>
                                </div>
                                <div>
                                    <p id='font2' className='text-xs uppercase tracking-wider text-gray-500'>Payment Method</p>
                                    <p id='font3' className='text-sm capitalize'>{selectedOrder.paymentMethod}</p>
                                </div>
                                <div>
                                    <p id='font2' className='text-xs uppercase tracking-wider text-gray-500'>Total</p>
                                    <p id='font1' className='text-2xl'>{selectedOrder.total?.toFixed(2)} €</p>
                                </div>
                            </div>

                            <div className='mb-6'>
                                <p id='font2' className='text-xs uppercase tracking-wider text-gray-500 mb-3'>Update Status</p>
                                <div className='flex flex-wrap gap-2'>
                                    {['pending', 'processing', 'shipped', 'completed', 'cancelled'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                            className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${selectedOrder.status === status
                                                    ? 'bg-black text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className='w-full py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOrders

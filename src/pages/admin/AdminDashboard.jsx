import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import Navbar from '../../components/Navbar'

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalUsers: 0,
        pendingOrders: 0
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            // Fetch orders
            const ordersSnapshot = await getDocs(collection(db, 'orders'))
            const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
            const pendingOrders = orders.filter(o => o.status === 'pending').length

            // Fetch users
            const usersSnapshot = await getDocs(collection(db, 'users'))

            setStats({
                totalOrders: orders.length,
                totalRevenue,
                totalUsers: usersSnapshot.size,
                pendingOrders
            })

            // Get recent orders
            const recentQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5))
            const recentSnapshot = await getDocs(recentQuery)
            setRecentOrders(recentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>
                <div className='max-w-7xl mx-auto px-6 py-8'>
                    {/* Header */}
                    <div className='mb-8'>
                        <h1 id='font1' className='text-3xl sm:text-4xl'>Admin Dashboard</h1>
                        <p id='font3' className='text-gray-500 mt-2'>Manage your store and view analytics</p>
                    </div>

                    {/* Stats Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                        <div className='bg-white p-6 rounded-xl shadow-sm'>
                            <p id='font3' className='text-gray-500 text-sm mb-2'>Total Orders</p>
                            <p id='font1' className='text-3xl'>{stats.totalOrders}</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm'>
                            <p id='font3' className='text-gray-500 text-sm mb-2'>Total Revenue</p>
                            <p id='font1' className='text-3xl text-green-600'>{stats.totalRevenue.toFixed(2)} €</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm'>
                            <p id='font3' className='text-gray-500 text-sm mb-2'>Total Users</p>
                            <p id='font1' className='text-3xl'>{stats.totalUsers}</p>
                        </div>
                        <div className='bg-white p-6 rounded-xl shadow-sm'>
                            <p id='font3' className='text-gray-500 text-sm mb-2'>Pending Orders</p>
                            <p id='font1' className='text-3xl text-amber-600'>{stats.pendingOrders}</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
                        <Link to='/admin/products' className='bg-black text-white p-6 rounded-xl hover:bg-gray-800 transition-colors'>
                            <span className='text-3xl mb-4 block'>📦</span>
                            <h3 id='font2' className='text-lg uppercase tracking-wider'>Manage Products</h3>
                            <p id='font3' className='text-white/70 text-sm mt-2'>Add, edit, or remove products</p>
                        </Link>
                        <Link to='/admin/orders' className='bg-amber-600 text-white p-6 rounded-xl hover:bg-amber-700 transition-colors'>
                            <span className='text-3xl mb-4 block'>📋</span>
                            <h3 id='font2' className='text-lg uppercase tracking-wider'>Manage Orders</h3>
                            <p id='font3' className='text-white/70 text-sm mt-2'>View and update order status</p>
                        </Link>
                        <Link to='/admin/users' className='bg-gray-700 text-white p-6 rounded-xl hover:bg-gray-600 transition-colors'>
                            <span className='text-3xl mb-4 block'>👥</span>
                            <h3 id='font2' className='text-lg uppercase tracking-wider'>Manage Users</h3>
                            <p id='font3' className='text-white/70 text-sm mt-2'>View users and set admin access</p>
                        </Link>
                    </div>

                    {/* Recent Orders */}
                    <div className='bg-white rounded-xl shadow-sm p-6'>
                        <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Recent Orders</h2>
                        {loading ? (
                            <p id='font3' className='text-gray-500 text-center py-8'>Loading...</p>
                        ) : recentOrders.length === 0 ? (
                            <p id='font3' className='text-gray-500 text-center py-8'>No orders yet</p>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='w-full'>
                                    <thead>
                                        <tr className='border-b border-gray-100'>
                                            <th id='font2' className='text-left py-3 text-xs uppercase tracking-wider text-gray-500'>Order ID</th>
                                            <th id='font2' className='text-left py-3 text-xs uppercase tracking-wider text-gray-500'>Customer</th>
                                            <th id='font2' className='text-left py-3 text-xs uppercase tracking-wider text-gray-500'>Total</th>
                                            <th id='font2' className='text-left py-3 text-xs uppercase tracking-wider text-gray-500'>Status</th>
                                            <th id='font2' className='text-left py-3 text-xs uppercase tracking-wider text-gray-500'>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className='border-b border-gray-50'>
                                                <td id='font3' className='py-4 text-sm'>#{order.id.slice(0, 8)}</td>
                                                <td id='font3' className='py-4 text-sm'>{order.customerName || 'Unknown'}</td>
                                                <td id='font2' className='py-4 text-sm'>{order.total?.toFixed(2)} €</td>
                                                <td className='py-4'>
                                                    <span className={`px-3 py-1 rounded-full text-xs ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {order.status || 'pending'}
                                                    </span>
                                                </td>
                                                <td id='font3' className='py-4 text-sm text-gray-500'>
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard

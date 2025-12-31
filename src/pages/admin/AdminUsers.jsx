import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import Navbar from '../../components/Navbar'

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'users'))
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleAdminRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin'
        if (window.confirm(`Change user role to ${newRole}?`)) {
            try {
                await updateDoc(doc(db, 'users', userId), { role: newRole })
                fetchUsers()
            } catch (error) {
                console.error('Error updating user role:', error)
            }
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
                        <h1 id='font1' className='text-3xl sm:text-4xl mt-2'>Manage Users</h1>
                    </div>

                    {/* Users Table */}
                    <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                        {loading ? (
                            <p id='font3' className='text-gray-500 text-center py-12'>Loading users...</p>
                        ) : users.length === 0 ? (
                            <p id='font3' className='text-gray-500 text-center py-12'>No users found</p>
                        ) : (
                            <table className='w-full'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>User</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Email</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Role</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Joined</th>
                                        <th id='font2' className='text-left py-4 px-6 text-xs uppercase tracking-wider text-gray-500'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className='border-t border-gray-100 hover:bg-gray-50'>
                                            <td className='py-4 px-6'>
                                                <div className='flex items-center gap-3'>
                                                    <div className='w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold'>
                                                        {user.firstName?.charAt(0) || 'U'}
                                                    </div>
                                                    <p id='font3' className='text-sm'>{user.firstName} {user.lastName}</p>
                                                </div>
                                            </td>
                                            <td id='font3' className='py-4 px-6 text-sm text-gray-500'>{user.email}</td>
                                            <td className='py-4 px-6'>
                                                <span className={`px-3 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td id='font3' className='py-4 px-6 text-sm text-gray-500'>
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className='py-4 px-6'>
                                                <button
                                                    onClick={() => toggleAdminRole(user.id, user.role)}
                                                    className={`text-sm hover:underline ${user.role === 'admin' ? 'text-red-600' : 'text-purple-600'
                                                        }`}
                                                >
                                                    {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
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
        </div>
    )
}

export default AdminUsers

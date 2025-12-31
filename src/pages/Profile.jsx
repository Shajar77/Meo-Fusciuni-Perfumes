import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { db, auth } from '../firebase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Profile = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || ''
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        try {
            await updateDoc(doc(db, 'users', user.uid), {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                updatedAt: new Date().toISOString()
            })
            setMessage('Profile updated successfully!')
            setEditing(false)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setMessage('')

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match')
            setLoading(false)
            return
        }

        if (passwordData.newPassword.length < 6) {
            setError('Password must be at least 6 characters')
            setLoading(false)
            return
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword)
            await reauthenticateWithCredential(auth.currentUser, credential)
            await updatePassword(auth.currentUser, passwordData.newPassword)
            setMessage('Password updated successfully!')
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <div className='w-full min-h-screen bg-[#f8f8f8]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Header */}
                <div className='bg-black py-12 sm:py-16'>
                    <div className='max-w-4xl mx-auto px-6 text-center'>
                        <div className='w-20 h-20 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6'>
                            <span id='font1' className='text-3xl'>{user?.firstName?.charAt(0) || 'U'}</span>
                        </div>
                        <h1 id='font1' className='text-white text-3xl sm:text-4xl'>
                            {user?.firstName} {user?.lastName}
                        </h1>
                        <p id='font3' className='text-white/60 mt-2'>{user?.email}</p>
                    </div>
                </div>

                {/* Content */}
                <div className='max-w-2xl mx-auto px-6 py-12'>

                    {/* Messages */}
                    {message && (
                        <div className='bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6'>
                            <p id='font3' className='text-sm'>{message}</p>
                        </div>
                    )}
                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6'>
                            <p id='font3' className='text-sm'>{error}</p>
                        </div>
                    )}

                    {/* Profile Info */}
                    <div className='bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-6'>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 id='font2' className='text-lg uppercase tracking-wider'>Profile Information</h2>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className='text-amber-700 text-sm hover:underline'
                                >
                                    Edit
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <form onSubmit={handleUpdateProfile} className='space-y-4'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>First Name</label>
                                        <input
                                            type='text'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                        />
                                    </div>
                                    <div>
                                        <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Last Name</label>
                                        <input
                                            type='text'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Phone</label>
                                    <input
                                        type='tel'
                                        name='phone'
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                    />
                                </div>
                                <div className='flex gap-4 pt-4'>
                                    <button
                                        type='button'
                                        onClick={() => setEditing(false)}
                                        className='flex-1 py-3 border border-gray-200 rounded-lg hover:bg-gray-50'
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={loading}
                                        id='font2'
                                        className='flex-1 py-3 bg-black text-white rounded-lg hover:bg-amber-700 uppercase text-sm tracking-wider disabled:opacity-50'
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='space-y-4'>
                                <div className='flex justify-between py-3 border-b border-gray-100'>
                                    <span id='font3' className='text-gray-500'>Name</span>
                                    <span id='font2'>{user?.firstName} {user?.lastName}</span>
                                </div>
                                <div className='flex justify-between py-3 border-b border-gray-100'>
                                    <span id='font3' className='text-gray-500'>Email</span>
                                    <span id='font3'>{user?.email}</span>
                                </div>
                                <div className='flex justify-between py-3 border-b border-gray-100'>
                                    <span id='font3' className='text-gray-500'>Phone</span>
                                    <span id='font3'>{user?.phone || 'Not set'}</span>
                                </div>
                                <div className='flex justify-between py-3'>
                                    <span id='font3' className='text-gray-500'>Account Type</span>
                                    <span className={`px-3 py-1 rounded-full text-xs ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user?.role || 'User'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Change Password */}
                    <div className='bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-6'>
                        <h2 id='font2' className='text-lg uppercase tracking-wider mb-6'>Change Password</h2>
                        <form onSubmit={handleUpdatePassword} className='space-y-4'>
                            <div>
                                <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Current Password</label>
                                <input
                                    type='password'
                                    name='currentPassword'
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                />
                            </div>
                            <div>
                                <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>New Password</label>
                                <input
                                    type='password'
                                    name='newPassword'
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                />
                            </div>
                            <div>
                                <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Confirm New Password</label>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                    className='w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-black'
                                />
                            </div>
                            <button
                                type='submit'
                                disabled={loading}
                                id='font2'
                                className='w-full py-3 bg-black text-white rounded-lg hover:bg-amber-700 uppercase text-sm tracking-wider disabled:opacity-50'
                            >
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        id='font2'
                        className='w-full py-4 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 uppercase text-sm tracking-wider transition-colors'
                    >
                        Sign Out
                    </button>
                </div>

                <Footer />
            </div>
        </div>
    )
}

export default Profile

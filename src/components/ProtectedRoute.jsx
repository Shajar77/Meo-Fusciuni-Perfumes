import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user, loading, isAdmin } = useAuth()

    if (loading) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4'></div>
                    <p id='font3' className='text-gray-500'>Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to='/login' replace />
    }

    if (requireAdmin && !isAdmin()) {
        return <Navigate to='/' replace />
    }

    return children
}

export default ProtectedRoute

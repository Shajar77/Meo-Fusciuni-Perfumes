import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const Login = () => {
    const navigate = useNavigate()
    const { signIn, signUp, resetPassword } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [isResetPassword, setIsResetPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')
        setLoading(true)

        if (isResetPassword) {
            const result = await resetPassword(formData.email)
            if (result.success) {
                setMessage('Password reset email sent! Check your inbox.')
                setIsResetPassword(false)
            } else {
                setError(result.error)
            }
            setLoading(false)
            return
        }

        if (isLogin) {
            const result = await signIn(formData.email, formData.password)
            if (result.success) {
                // Check if user is admin and redirect accordingly
                if (result.role === 'admin') {
                    navigate('/admin')
                } else {
                    navigate('/')
                }
            } else {
                setError(result.error)
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match')
                setLoading(false)
                return
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters')
                setLoading(false)
                return
            }
            const result = await signUp(formData.email, formData.password, formData.firstName, formData.lastName)
            if (result.success) {
                setMessage('Account created! Please check your email to verify your account.')
                setIsLogin(true)
            } else {
                setError(result.error)
            }
        }
        setLoading(false)
    }

    return (
        <div className='w-full min-h-screen bg-[#f8f8f6]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px] min-h-screen flex items-center justify-center px-6 py-16'>
                <div className='w-full max-w-md'>
                    {/* Logo */}
                    <div className='text-center mb-12'>
                        <h1 id='font1' className='text-3xl sm:text-4xl tracking-wide mb-2'>MEO FUSCIUNI</h1>
                        <p id='font3' className='text-xs uppercase tracking-[0.3em] text-gray-500'>Parfums</p>
                    </div>

                    {/* Form Card */}
                    <div className='bg-white p-8 sm:p-12 shadow-xl shadow-black/5 rounded-2xl'>
                        {isResetPassword ? (
                            <>
                                <h2 id='font2' className='text-lg uppercase tracking-wider text-center mb-6'>Reset Password</h2>
                                <p id='font3' className='text-gray-500 text-center text-sm mb-8'>
                                    Enter your email and we'll send you a link to reset your password.
                                </p>
                            </>
                        ) : (
                            <div className='flex mb-10 border-b border-gray-200'>
                                <button
                                    onClick={() => { setIsLogin(true); setError(''); }}
                                    className={`flex-1 pb-4 text-center transition-all ${isLogin ? 'border-b-2 border-black' : 'border-b-2 border-transparent text-gray-400'}`}
                                >
                                    <span id='font2' className='text-sm uppercase tracking-wider'>Sign In</span>
                                </button>
                                <button
                                    onClick={() => { setIsLogin(false); setError(''); }}
                                    className={`flex-1 pb-4 text-center transition-all ${!isLogin ? 'border-b-2 border-black' : 'border-b-2 border-transparent text-gray-400'}`}
                                >
                                    <span id='font2' className='text-sm uppercase tracking-wider'>Create Account</span>
                                </button>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6'>
                                <p id='font3' className='text-sm'>{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {message && (
                            <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6'>
                                <p id='font3' className='text-sm'>{message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            {/* Sign Up Fields */}
                            {!isLogin && !isResetPassword && (
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>First Name</label>
                                        <input
                                            type='text'
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required={!isLogin}
                                            id='font3'
                                            className='w-full border-b-2 border-gray-200 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                            placeholder='John'
                                        />
                                    </div>
                                    <div>
                                        <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Last Name</label>
                                        <input
                                            type='text'
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required={!isLogin}
                                            id='font3'
                                            className='w-full border-b-2 border-gray-200 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                            placeholder='Doe'
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Email Address</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    id='font3'
                                    className='w-full border-b-2 border-gray-200 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                    placeholder='you@example.com'
                                />
                            </div>

                            {/* Password */}
                            {!isResetPassword && (
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        id='font3'
                                        className='w-full border-b-2 border-gray-200 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                        placeholder='••••••••'
                                    />
                                </div>
                            )}

                            {/* Confirm Password (Sign Up only) */}
                            {!isLogin && !isResetPassword && (
                                <div>
                                    <label id='font2' className='block text-[10px] uppercase tracking-wider text-gray-500 mb-2'>Confirm Password</label>
                                    <input
                                        type='password'
                                        name='confirmPassword'
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required={!isLogin}
                                        id='font3'
                                        className='w-full border-b-2 border-gray-200 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                        placeholder='••••••••'
                                    />
                                </div>
                            )}

                            {/* Forgot Password (Login only) */}
                            {isLogin && !isResetPassword && (
                                <div className='text-right'>
                                    <button
                                        type='button'
                                        onClick={() => setIsResetPassword(true)}
                                        id='font3'
                                        className='text-sm text-amber-700 hover:text-amber-800 transition-colors'
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type='submit'
                                disabled={loading}
                                id='font2'
                                className='w-full py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-amber-700 transition-all duration-500 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                                        Processing...
                                    </span>
                                ) : (
                                    isResetPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'
                                )}
                            </button>

                            {/* Back to login from reset password */}
                            {isResetPassword && (
                                <button
                                    type='button'
                                    onClick={() => setIsResetPassword(false)}
                                    id='font3'
                                    className='w-full text-center text-sm text-gray-500 hover:text-black transition-colors mt-4'
                                >
                                    ← Back to Sign In
                                </button>
                            )}
                        </form>
                    </div>

                    {/* Terms */}
                    <p id='font3' className='text-center text-xs text-gray-500 mt-8'>
                        By continuing, you agree to our <a href='#' className='text-amber-700 hover:underline'>Terms of Service</a> and <a href='#' className='text-amber-700 hover:underline'>Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login

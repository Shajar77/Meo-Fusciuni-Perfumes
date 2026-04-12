import { useState } from 'react'
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
        <div className='h-screen w-full flex flex-col overflow-hidden'>
            <Navbar />
            <div className='flex-1 flex pt-[72px] h-[calc(100vh-72px)]'>
                {/* Left Side - Form */}
                <div className='w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-6 bg-[#0a0a0a]'>
                    {/* Welcome Text */}
                <div className='mb-5'>
                    <h2 id='font1' className='text-3xl sm:text-4xl text-white mb-3'>
                        {isResetPassword ? 'Reset Password' : isLogin ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p id='font3' className='text-gray-400 text-sm'>
                        {isResetPassword 
                            ? "Enter your email and we'll send you a link to reset your password."
                            : isLogin 
                                ? 'Sign in to access your account and orders' 
                                : 'Join us and discover the world of fine fragrances'}
                    </p>
                </div>

                {/* Tab Switcher */}
                {!isResetPassword && (
                    <div className='flex gap-6 mb-4 border-b border-gray-700'>
                        <button
                            onClick={() => { setIsLogin(true); setError(''); }}
                            className={`pb-4 text-sm transition-all ${isLogin ? 'border-b-2 border-white text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            id='font2'
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => { setIsLogin(false); setError(''); }}
                            className={`pb-4 text-sm transition-all ${!isLogin ? 'border-b-2 border-white text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            id='font2'
                        >
                            Sign Up
                        </button>
                    </div>
                )}

                {/* Error & Success Messages */}
                {error && (
                    <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4'>
                        <p id='font3' className='text-sm'>{error}</p>
                    </div>
                )}
                {message && (
                    <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4'>
                        <p id='font3' className='text-sm'>{message}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className='space-y-3'>
                    {/* Name Fields - Sign Up Only */}
                    {!isLogin && !isResetPassword && (
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-400 mb-2'>First Name</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    id='font3'
                                    className='w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#0a0a0a] text-white placeholder-gray-500'
                                    placeholder='John'
                                />
                            </div>
                            <div>
                                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-400 mb-2'>Last Name</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required={!isLogin}
                                    id='font3'
                                    className='w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#0a0a0a] text-white placeholder-gray-500'
                                    placeholder='Doe'
                                />
                            </div>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-400 mb-2'>Email Address</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            id='font3'
                            className='w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#0a0a0a] text-white placeholder-gray-500'
                            placeholder='you@example.com'
                        />
                    </div>

                    {/* Password */}
                    {!isResetPassword && (
                        <div>
                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-400 mb-2'>
                                Password
                                {isLogin && (
                                    <button
                                        type='button'
                                        onClick={() => setIsResetPassword(true)}
                                        className='float-right text-[11px] text-amber-400 hover:text-amber-300 transition-colors normal-case'
                                        id='font3'
                                    >
                                        Forgot password?
                                    </button>
                                )}
                            </label>
                            <input
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                id='font3'
                                className='w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#0a0a0a] text-white placeholder-gray-500'
                                placeholder='••••••••'
                            />
                        </div>
                    )}

                    {/* Confirm Password - Sign Up Only */}
                    {!isLogin && !isResetPassword && (
                        <div>
                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-400 mb-2'>Confirm Password</label>
                            <input
                                type='password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required={!isLogin}
                                id='font3'
                                className='w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors bg-[#0a0a0a] text-white placeholder-gray-500'
                                placeholder='••••••••'
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        id='font2'
                        className='w-full py-3.5 bg-white text-black text-sm uppercase tracking-[0.15em] hover:bg-gray-200 transition-all duration-300 rounded-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed'
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

                    {/* Back to Login */}
                    {isResetPassword && (
                        <button
                            type='button'
                            onClick={() => setIsResetPassword(false)}
                            id='font3'
                            className='w-full text-center text-sm text-gray-500 hover:text-white transition-colors'
                        >
                            ← Back to Sign In
                        </button>
                    )}
                </form>

            </div>

                {/* Right Side - Image */}
                <div className='hidden lg:block w-1/2 relative bg-gray-100'>
                    <img
                        src='/pexels-kseniya-kopna-52379050-11556383.jpg'
                        alt='Meo Fusciuni Perfume'
                        className='w-full h-full object-cover object-center'
                    />
                    <div className='absolute inset-0 bg-gradient-to-l from-transparent to-black/10' />
                </div>
            </div>
        </div>
    )
}

export default Login

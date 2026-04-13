import { useState } from 'react';
import { submitContactForm } from '../services/contactService';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        const result = await submitContactForm(formData);

        if (result.success) {
            setSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });
        } else {
            setError(result.error || 'Failed to send message. Please try again.');
        }

        setLoading(false);
    };

    if (success) {
        return (
            <div className='bg-green-50 border border-green-200 rounded-lg p-8 text-center'>
                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>✓</span>
                </div>
                <h3 id='font2' className='text-xl text-green-800 mb-2'>Message Sent!</h3>
                <p id='font3' className='text-green-600 mb-6'>Thank you for reaching out. We'll get back to you soon.</p>
                <button
                    onClick={() => setSuccess(false)}
                    id='font2'
                    className='px-6 py-2 border border-green-600 text-green-700 rounded hover:bg-green-50 transition-colors'
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            {error && (
                <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg'>
                    <p id='font3' className='text-sm'>{error}</p>
                </div>
            )}

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                    <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                        First Name *
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        id='font3'
                        className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                        placeholder='John'
                        required
                    />
                </div>
                <div>
                    <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                        Last Name *
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        id='font3'
                        className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                        placeholder='Doe'
                        required
                    />
                </div>
            </div>

            <div>
                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                    Email Address *
                </label>
                <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    id='font3'
                    className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                    placeholder='john@example.com'
                    required
                />
            </div>

            <div>
                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                    Subject
                </label>
                <select
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    id='font3'
                    className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent cursor-pointer'
                >
                    <option value=''>Select a topic</option>
                    <option value='general'>General Inquiry</option>
                    <option value='order'>Order Support</option>
                    <option value='wholesale'>Wholesale</option>
                    <option value='press'>Press & Media</option>
                    <option value='other'>Other</option>
                </select>
            </div>

            <div>
                <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                    Message *
                </label>
                <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    id='font3'
                    rows='5'
                    className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent resize-none'
                    placeholder='Your message...'
                    required
                ></textarea>
            </div>

            <button
                type='submit'
                disabled={loading}
                id='font2'
                className='mt-4 px-10 py-4 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-amber-700 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
                {loading ? (
                    <span className='flex items-center justify-center gap-2'>
                        <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                        Sending...
                    </span>
                ) : (
                    'Send Message'
                )}
            </button>
        </form>
    );
};

export default ContactForm;

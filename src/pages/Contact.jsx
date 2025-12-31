import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
    return (
        <div className='w-full'>
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Hero Section */}
                <section className='bg-black py-20 sm:py-28 lg:py-36'>
                    <div className='max-w-4xl mx-auto px-6 text-center'>
                        <p id='font3' className='text-amber-400/80 text-xs sm:text-sm uppercase tracking-[0.3em] mb-6'>Get in Touch</p>
                        <h1 id='font1' className='text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6'>
                            Contact Us
                        </h1>
                        <p id='font3' className='text-white/60 text-base sm:text-lg italic max-w-2xl mx-auto'>
                            We'd love to hear from you. Whether you have a question about our fragrances,
                            need assistance, or just want to say hello.
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className='bg-white py-20 sm:py-28'>
                    <div className='max-w-6xl mx-auto px-6'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24'>

                            {/* Contact Form */}
                            <div>
                                <p id='font2' className='text-xs uppercase tracking-[0.25em] text-amber-700 mb-4'>Send a Message</p>
                                <h2 id='font1' className='text-2xl sm:text-3xl text-black mb-8'>
                                    Write to Us
                                </h2>

                                <form className='space-y-6'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                                                First Name
                                            </label>
                                            <input
                                                type='text'
                                                id='font3'
                                                className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                                placeholder='John'
                                            />
                                        </div>
                                        <div>
                                            <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                                                Last Name
                                            </label>
                                            <input
                                                type='text'
                                                id='font3'
                                                className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                                placeholder='Doe'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                                            Email Address
                                        </label>
                                        <input
                                            type='email'
                                            id='font3'
                                            className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent'
                                            placeholder='john@example.com'
                                        />
                                    </div>

                                    <div>
                                        <label id='font2' className='block text-[11px] uppercase tracking-wider text-gray-500 mb-2'>
                                            Subject
                                        </label>
                                        <select
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
                                            Message
                                        </label>
                                        <textarea
                                            id='font3'
                                            rows='5'
                                            className='w-full border-b border-gray-300 py-3 text-base focus:outline-none focus:border-black transition-colors bg-transparent resize-none'
                                            placeholder='Your message...'
                                        ></textarea>
                                    </div>

                                    <button
                                        type='submit'
                                        id='font2'
                                        className='mt-4 px-10 py-4 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-amber-700 transition-colors duration-500'
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className='lg:pl-12'>
                                <p id='font2' className='text-xs uppercase tracking-[0.25em] text-amber-700 mb-4'>Contact Information</p>
                                <h2 id='font1' className='text-2xl sm:text-3xl text-black mb-10'>
                                    Find Us
                                </h2>

                                <div className='space-y-8'>
                                    {/* Address */}
                                    <div className='group'>
                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-50 transition-all duration-300'>
                                                <span className='text-xl'>📍</span>
                                            </div>
                                            <div>
                                                <h3 id='font2' className='text-sm uppercase tracking-wider text-black mb-2'>Address</h3>
                                                <p id='font3' className='text-gray-600 leading-relaxed'>
                                                    45-A, M.M. Alam Road<br />
                                                    Gulberg III<br />
                                                    Lahore, Pakistan
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className='group'>
                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-50 transition-all duration-300'>
                                                <span className='text-xl'>📞</span>
                                            </div>
                                            <div>
                                                <h3 id='font2' className='text-sm uppercase tracking-wider text-black mb-2'>Phone</h3>
                                                <p id='font3' className='text-gray-600'>
                                                    +92 42 3578 1234
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className='group'>
                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-50 transition-all duration-300'>
                                                <span className='text-xl'>✉️</span>
                                            </div>
                                            <div>
                                                <h3 id='font2' className='text-sm uppercase tracking-wider text-black mb-2'>Email</h3>
                                                <p id='font3' className='text-gray-600'>
                                                    info@meofusciuni.pk
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hours */}
                                    <div className='group'>
                                        <div className='flex items-start gap-4'>
                                            <div className='w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-amber-400 group-hover:bg-amber-50 transition-all duration-300'>
                                                <span className='text-xl'>🕐</span>
                                            </div>
                                            <div>
                                                <h3 id='font2' className='text-sm uppercase tracking-wider text-black mb-2'>Hours</h3>
                                                <p id='font3' className='text-gray-600 leading-relaxed'>
                                                    Monday - Saturday: 11:00 AM - 9:00 PM<br />
                                                    Sunday: 2:00 PM - 9:00 PM<br />
                                                    Friday Prayers: 1:00 PM - 3:00 PM (Closed)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className='mt-12 pt-8 border-t border-gray-200'>
                                    <p id='font2' className='text-xs uppercase tracking-[0.2em] text-gray-500 mb-6'>Follow Us</p>
                                    <div className='flex gap-4'>
                                        <a href='#' className='w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                                            </svg>
                                        </a>
                                        <a href='#' className='w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                                <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                                            </svg>
                                        </a>
                                        <a href='#' className='w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all duration-300'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                                                <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className='bg-[#f5f5f0] py-20'>
                    <div className='max-w-6xl mx-auto px-6'>
                        <div className='text-center mb-12'>
                            <p id='font2' className='text-xs uppercase tracking-[0.25em] text-amber-700 mb-4'>Visit Our Boutique</p>
                            <h2 id='font1' className='text-2xl sm:text-3xl text-black'>
                                Gulberg III, Lahore
                            </h2>
                        </div>
                        <div className='w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden'>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.8976044567!2d74.35287731511772!3d31.510534981388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f1b4ee8e9d%3A0x3e2e7c7c1b7a5d8a!2sM.M.%20Alam%20Road%2C%20Gulberg%20III%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1702383600000!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Meo Fusciuni Lahore Location"
                            ></iframe>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}

export default Contact

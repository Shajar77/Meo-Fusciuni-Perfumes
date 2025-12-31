import React from 'react'

const Footer = () => {
    return (
        <footer className='w-full bg-black text-white pt-20'>
            {/* Newsletter Section */}
            <div className='pt-12 pb-16'>
                <div className='max-w-xl mx-auto px-6 text-center'>
                    <h3 id='font2' className='text-[14px] uppercase tracking-[0.25em] text-amber-200/90 mb-5'>
                        Subscribe to the Meo Fusciuni Newsletter
                    </h3>
                    <div className='flex flex-col sm:flex-row items-stretch justify-center gap-0'>
                        <input
                            type='email'
                            placeholder='Leave your e-mail'
                            id='font3'
                            className='flex-1 bg-transparent border border-white/40 px-4 py-2.5 text-xs text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors duration-300'
                        />
                        <button
                            id='font4'
                            className='bg-white text-black px-6 py-2.5 text-[10px] uppercase tracking-[0.15em] hover:bg-white/90 transition-colors duration-300'
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className='py-16'>
                <div className='max-w-6xl mx-auto px-6 lg:px-12'>
                    <div className='flex flex-col lg:flex-row gap-16 lg:gap-0'>

                        {/* Logo & Social - Left Side */}
                        <div className='lg:w-1/4 text-center lg:text-left'>
                            <div className='mb-1'>
                                <span id='font1' className='text-lg tracking-[0.05em]'>MEO FUSCIUNI</span>
                            </div>
                            <p id='font3' className='text-[8px] uppercase tracking-[0.15em] text-white/50 mb-5'>Parfums</p>
                            <div className='flex gap-3 justify-center lg:justify-start'>
                                <a href='#' className='text-white/60 hover:text-white transition-colors duration-300'>
                                    <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                                    </svg>
                                </a>
                                <a href='#' className='text-white/60 hover:text-white transition-colors duration-300'>
                                    <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                                    </svg>
                                </a>
                                <a href='#' className='text-white/60 hover:text-white transition-colors duration-300'>
                                    <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Navigation Columns - Right Side */}
                        <div className='lg:w-3/4 grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-24 lg:pl-20'>

                            {/* About */}
                            <div className='text-center lg:text-left'>
                                <h4 id='font2' className='text-[13px] uppercase tracking-[0.15em] text-white mb-5'>
                                    About
                                </h4>
                                <ul className='space-y-2.5'>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Brand</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Meo Fusciuni</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Contacts</a></li>
                                </ul>
                            </div>

                            {/* Useful Links */}
                            <div className='text-center lg:text-left'>
                                <h4 id='font2' className='text-[13px] uppercase tracking-[0.15em] text-white mb-5'>
                                    Useful Links
                                </h4>
                                <ul className='space-y-2.5'>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>My Account</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Wishlist</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-amber-200/90 hover:text-amber-200 transition-colors duration-300'>Terms and Conditions</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Privacy Policy</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Cookie Policy</a></li>
                                </ul>
                            </div>

                            {/* Customer Care */}
                            <div className='col-span-2 lg:col-span-1 text-center lg:text-left'>
                                <h4 id='font2' className='text-[13px] uppercase tracking-[0.15em] text-white mb-5'>
                                    Customer Care
                                </h4>
                                <ul className='space-y-2.5'>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>FAQ</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Shipping</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-amber-200/90 hover:text-amber-200 transition-colors duration-300'>Returns and Refunds</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Payments</a></li>
                                    <li><a href='#' id='font2' className='text-[13px] text-white/60 hover:text-white transition-colors duration-300'>Order Tracking</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className='border-t border-white/10 py-6'>
                <div className='max-w-6xl mx-auto px-6'>
                    <div className='flex justify-center gap-2 mb-4'>
                        <div className='w-8 h-5 bg-white/10 rounded-sm flex items-center justify-center'>
                            <span className='text-[6px] text-white/50'>VISA</span>
                        </div>
                        <div className='w-8 h-5 bg-white/10 rounded-sm flex items-center justify-center'>
                            <span className='text-[6px] text-white/50'>MC</span>
                        </div>
                        <div className='w-8 h-5 bg-white/10 rounded-sm flex items-center justify-center'>
                            <span className='text-[6px] text-white/50'>AMEX</span>
                        </div>
                        <div className='w-8 h-5 bg-white/10 rounded-sm flex items-center justify-center'>
                            <span className='text-[6px] text-white/50'>PP</span>
                        </div>
                    </div>
                    <p id='font3' className='text-[8px] text-white/30 text-center tracking-wide'>
                        © Meo Fusciuni srl | Via Mazzini 27 - 98039 Taormina (ME) Italy - P.IVA 03841400947 REA: GP 370330
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer

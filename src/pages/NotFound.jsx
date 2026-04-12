import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NotFound = () => {
    return (
        <div className='w-full min-h-screen bg-[#f8f8f8]'>
            <Navbar />
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>
                <div className='max-w-4xl mx-auto px-6 py-20 sm:py-32 text-center'>
                    {/* 404 Display */}
                    <div className='mb-8'>
                        <h1 id='font1' className='text-[120px] sm:text-[180px] lg:text-[220px] leading-none text-black/10 select-none'>
                            404
                        </h1>
                    </div>

                    {/* Content */}
                    <p id='font3' className='text-amber-700 text-xs sm:text-sm uppercase tracking-[0.3em] mb-4'>
                        Page Not Found
                    </p>
                    <h2 id='font1' className='text-3xl sm:text-4xl lg:text-5xl text-black mb-6'>
                        Oops! Lost in the fragrance?
                    </h2>
                    <p id='font3' className='text-gray-600 text-lg mb-10 max-w-xl mx-auto'>
                        The page you're looking for seems to have vanished like a fleeting scent.
                        Let us guide you back to our collection.
                    </p>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        <Link
                            to='/'
                            id='font2'
                            className='px-10 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-amber-700 transition-colors duration-500'
                        >
                            Return Home
                        </Link>
                        <Link
                            to='/Perfumes'
                            id='font2'
                            className='px-10 py-4 border border-black text-black text-sm uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors duration-500'
                        >
                            Browse Perfumes
                        </Link>
                    </div>

                    {/* Decorative Element */}
                    <div className='mt-16 pt-16 border-t border-gray-200'>
                        <p id='font3' className='text-gray-400 text-sm italic'>
                            "All roads lead to beautiful fragrances"
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound

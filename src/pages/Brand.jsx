import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Brand = () => {
    return (
        <div className='w-full'>
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>

                {/* Hero Section */}
                <section className='relative h-[70vh] sm:h-[80vh] lg:h-screen w-full overflow-hidden'>
                    <div className='absolute inset-0 bg-black'>
                        <img
                            src='https://images.pexels.com/photos/8361539/pexels-photo-8361539.jpeg'
                            alt='Meo Fusciuni Brand'
                            className='w-full h-full object-cover opacity-40'
                        />
                    </div>
                    <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-[202px]'>
                        <p id='font3' className='text-white/70 text-xs sm:text-sm uppercase tracking-[0.3em] mb-4'>Established in Sicily</p>
                        <h1 id='font1' className='text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide mb-6'>
                            MEO FUSCIUNI
                        </h1>
                        <p id='font3' className='text-white/80 text-sm sm:text-base lg:text-[14px] italic max-w-2xl'>
                            "A journey through scents, memories, and emotions"
                        </p>
                    </div>
                    {/* Scroll Indicator */}
                    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
                        <div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2'>
                            <div className='w-1 h-2 bg-white/70 rounded-full'></div>
                        </div>
                    </div>
                </section>

                {/* Brand Story Section */}
                <section className='bg-white py-20 sm:py-28 lg:py-36'>
                    <div className='max-w-4xl mx-auto px-6 text-center'>
                        <p id='font2' className='text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-700 mb-8'>Our Story</p>
                        <h2 id='font1' className='text-3xl sm:text-4xl lg:text-5xl text-black mb-10 leading-tight'>
                            The Art of Olfactory Creation
                        </h2>
                        <p id='font3' className='text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-8'>
                            Meo Fusciuni is more than a perfume house — it is a philosophy of life. Born from the passion of Giuseppe Imprezzabile,
                            a self-taught nose who transformed his artistic vision into olfactory poetry. Each fragrance is a self-portrait,
                            a journey through memories, emotions, and the eternal search for beauty.
                        </p>
                        <p id='font3' className='text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed'>
                            From the sun-drenched landscapes of Sicily to the quiet ateliers of Taormina,
                            every creation tells a story of dedication, craftsmanship, and the pursuit of perfection.
                        </p>
                    </div>
                </section>

                {/* Philosophy Section with Image */}
                <section className='bg-[#f5f5f0] py-0'>
                    <div className='flex flex-col lg:flex-row'>
                        <div className='w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-[80vh]'>
                            <img
                                src='https://images.pexels.com/photos/33820348/pexels-photo-33820348.jpeg'
                                alt='Philosophy'
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-16 lg:py-0'>
                            <p id='font2' className='text-xs uppercase tracking-[0.25em] text-amber-700 mb-6'>Philosophy</p>
                            <h2 id='font1' className='text-2xl sm:text-3xl lg:text-4xl text-black mb-8 leading-tight'>
                                Essence of <br />Self-Discovery
                            </h2>
                            <p id='font3' className='text-base sm:text-lg text-gray-700 leading-relaxed mb-6'>
                                Creating a perfume is like searching for oneself. It is telling the emotion of an experience
                                and then sharing it with the world. At any point along our journey, the perfume tells a story.
                            </p>
                            <p id='font3' className='text-base sm:text-lg text-gray-700 leading-relaxed'>
                                Through smells, free from any conditioning, you will remember a dormant part of your past —
                                you will search for yourself.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className='bg-black py-20 sm:py-28 lg:py-36'>
                    <div className='max-w-6xl mx-auto px-6'>
                        <div className='text-center mb-16'>
                            <p id='font2' className='text-xs sm:text-sm uppercase tracking-[0.25em] text-amber-400 mb-6'>Our Values</p>
                            <h2 id='font1' className='text-3xl sm:text-4xl lg:text-5xl text-white'>
                                What Defines Us
                            </h2>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
                            {/* Value 1 */}
                            <div className='text-center group'>
                                <div className='w-20 h-20 mx-auto mb-6 border border-amber-400/50 rounded-full flex items-center justify-center group-hover:bg-amber-400/10 transition-all duration-500'>
                                    <span className='text-amber-400 text-3xl'>✦</span>
                                </div>
                                <h3 id='font2' className='text-white text-lg sm:text-xl mb-4 uppercase tracking-wider'>Authenticity</h3>
                                <p id='font3' className='text-white/70 text-sm sm:text-base leading-relaxed'>
                                    Every fragrance is born from genuine emotion and personal experience, never from market trends.
                                </p>
                            </div>

                            {/* Value 2 */}
                            <div className='text-center group'>
                                <div className='w-20 h-20 mx-auto mb-6 border border-amber-400/50 rounded-full flex items-center justify-center group-hover:bg-amber-400/10 transition-all duration-500'>
                                    <span className='text-amber-400 text-3xl'>◈</span>
                                </div>
                                <h3 id='font2' className='text-white text-lg sm:text-xl mb-4 uppercase tracking-wider'>Craftsmanship</h3>
                                <p id='font3' className='text-white/70 text-sm sm:text-base leading-relaxed'>
                                    Handcrafted with passion in Italy, using the finest raw materials and time-honored techniques.
                                </p>
                            </div>

                            {/* Value 3 */}
                            <div className='text-center group'>
                                <div className='w-20 h-20 mx-auto mb-6 border border-amber-400/50 rounded-full flex items-center justify-center group-hover:bg-amber-400/10 transition-all duration-500'>
                                    <span className='text-amber-400 text-3xl'>❖</span>
                                </div>
                                <h3 id='font2' className='text-white text-lg sm:text-xl mb-4 uppercase tracking-wider'>Poetry</h3>
                                <p id='font3' className='text-white/70 text-sm sm:text-base leading-relaxed'>
                                    Each scent is a poem, telling stories of light, shadow, memory, and the human experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className='bg-[#f5f5f0] py-20 sm:py-28 lg:py-36'>
                    <div className='max-w-3xl mx-auto px-6 text-center'>
                        <div className='text-6xl sm:text-7xl text-amber-600/30 mb-6'>"</div>
                        <blockquote id='font3' className='text-xl sm:text-2xl lg:text-3xl text-gray-800 italic leading-relaxed mb-8'>
                            Everything begins with sensing: scent, memory and emotion. With closed eyes,
                            we try to listen to that subtle bond between us and perfume.
                        </blockquote>
                        <p id='font2' className='text-sm uppercase tracking-[0.2em] text-amber-700'>
                            — Giuseppe Imprezzabile, Founder
                        </p>
                    </div>
                </section>

                {/* Atelier Section */}
                <section className='bg-white py-0'>
                    <div className='flex flex-col lg:flex-row-reverse'>
                        <div className='w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-[80vh]'>
                            <img
                                src='https://images.pexels.com/photos/32630380/pexels-photo-32630380.jpeg'
                                alt='Atelier'
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-16 lg:py-0'>
                            <p id='font2' className='text-xs uppercase tracking-[0.25em] text-amber-700 mb-6'>The Atelier</p>
                            <h2 id='font1' className='text-2xl sm:text-3xl lg:text-4xl text-black mb-8 leading-tight'>
                                Where Magic <br />Comes to Life
                            </h2>
                            <p id='font3' className='text-base sm:text-lg text-gray-700 leading-relaxed mb-6'>
                                In our atelier in Taormina, surrounded by the beauty of Sicily, each perfume takes shape
                                through careful meditation and artistic expression.
                            </p>
                            <p id='font3' className='text-base sm:text-lg text-gray-700 leading-relaxed'>
                                Here, time slows down, and the art of perfumery becomes a sacred ritual of creation
                                and self-discovery.
                            </p>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    )
}

export default Brand

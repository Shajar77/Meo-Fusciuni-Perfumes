import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Brand = () => {
    const observerRef = useRef(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100', 'translate-y-0')
                        entry.target.classList.remove('opacity-0', 'translate-y-10')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
            observerRef.current.observe(el)
        })

        return () => observerRef.current?.disconnect()
    }, [])

    return (
        <div className='w-full bg-[var(--color-black-primary)]'>
            {/* Hero Section - Cinematic */}
            <section className='relative min-h-screen overflow-hidden'>
                <div className='absolute inset-0'>
                    <img
                        src='/pexels-tara-winstead-6694187.jpg'
                        alt='Meo Fusciuni'
                        loading='eager'
                        decoding='async'
                        fetchPriority='high'
                        className='w-full h-full object-cover opacity-70 scale-105 animate-slow-zoom'
                    />
                </div>
                <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[var(--color-black-primary)]' />

                {/* Navbar */}
                <div className='relative z-20'>
                    <Navbar />
                </div>

                {/* Hero Content - Centered */}
                <div className='absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center'>
                    <h1 id='font1' className='reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-8 tracking-tight'>
                        Meo Fusciuni
                    </h1>
                    <div className='reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-150 w-24 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mb-8' />
                    <p className='reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300 text-[var(--color-gold)] text-xs uppercase tracking-[0.5em]'>
                        Sicily, Italy
                    </p>
                </div>
            </section>

                {/* Brand Story - Split Layout */}
                <section className='py-24 sm:py-32 px-6 sm:px-8 lg:px-12'>
                    <div className='max-w-6xl mx-auto'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                            <div className='reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000'>
                                <div className='relative rounded-2xl overflow-hidden group flex items-center justify-center'>
                                    <img
                                        src='/Shop _ Meo Fusciuni.jpg'
                                        alt='Meo Fusciuni Perfume'
                                        loading='lazy'
                                        decoding='async'
                                        fetchPriority='low'
                                        className='w-full h-[400px] sm:h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-105'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
                                </div>
                            </div>
                            <div className='reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200 lg:pl-8'>
                                <p id='font2' className='text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] mb-6'>
                                    Our Story
                                </p>
                                <h2 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl font-medium mb-8 leading-tight'>
                                    The Art of<br />Olfactory Creation
                                </h2>
                                <div className='w-16 h-px bg-[var(--color-gold)]/30 mb-8' />
                                <p id='font3' className='text-white/70 text-base sm:text-lg leading-[1.8] mb-6'>
                                    Born from the passion of Giuseppe Imprezzabile, a self-taught nose who transformed 
                                    artistic vision into olfactory poetry. Each fragrance is a self-portrait — a journey 
                                    through memories, emotions, and the eternal search for beauty.
                                </p>
                                <p id='font3' className='text-white/70 text-base sm:text-lg leading-[1.8]'>
                                    From the sun-drenched landscapes of Sicily to the quiet ateliers of Taormina,
                                    every creation tells a story of dedication, craftsmanship, and the pursuit of perfection.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy - Full Width Image */}
                <section className='relative'>
                    <div className='h-[60vh] sm:h-[70vh] relative overflow-hidden'>
                        <img
                            src='/pexels-jean-pierre-3622694-5466870.jpg'
                            alt='Philosophy'
                            loading='lazy'
                            decoding='async'
                            fetchPriority='low'
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent' />
                        <div className='absolute inset-0 flex items-start sm:items-center justify-center sm:justify-start pt-20 sm:pt-0 px-8 sm:px-12 lg:px-20'>
                            <div className='reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 w-full sm:w-auto sm:max-w-sm text-center sm:text-left'>
                                <div className='flex items-center justify-center sm:justify-start gap-4 mb-6'>
                                    <div className='hidden sm:block w-12 h-px bg-[var(--color-gold)]' />
                                    <p id='font2' className='text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]'>
                                        Philosophy
                                    </p>
                                </div>
                                <h2 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight'>
                                    Essence of<br />Self-Discovery
                                </h2>
                                <p id='font3' className='hidden sm:block text-white/80 text-base sm:text-lg leading-[1.8] mt-6'>
                                    Creating a perfume is like searching for oneself. Through smells, free from 
                                    any conditioning, you will remember a dormant part of your past — you will 
                                    search for yourself.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
    )
}

export default Brand

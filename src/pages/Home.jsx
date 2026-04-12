import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Note from '../components/Note'
import Footer from '../components/Footer'
import LazySection from '../components/LazySection'

const ChromaGrid = lazy(() => import('../components/ChromaGrid'))
const Testimonials = lazy(() => import('../components/Testimonials'))

const Home = () => {
    const videoRef = useRef(null)
    const [allowMotion, setAllowMotion] = useState(true)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const applyMotionPreference = () => setAllowMotion(!mediaQuery.matches)
        applyMotionPreference()

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', applyMotionPreference)
        } else {
            mediaQuery.addListener(applyMotionPreference)
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', applyMotionPreference)
            } else {
                mediaQuery.removeListener(applyMotionPreference)
            }
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!video || !allowMotion) return

        const handleVisibility = () => {
            if (document.hidden) {
                video.pause()
            } else {
                void video.play().catch(() => {})
            }
        }

        document.addEventListener('visibilitychange', handleVisibility)
        return () => document.removeEventListener('visibilitychange', handleVisibility)
    }, [allowMotion])

    return (
        <div className='w-full overflow-x-hidden bg-[var(--color-black-primary)]'>
            {/* Cinematic Hero Section */}
            <div className='relative min-h-screen w-full overflow-hidden'>
                {/* Video Background */}
                <video
                    ref={videoRef}
                    autoPlay={allowMotion}
                    muted
                    loop
                    playsInline
                    preload='metadata'
                    poster='/Meo-Fusciuni-Sito-Still-Life-100-ml.003-960x1277.jpeg'
                    className='absolute top-0 left-0 w-full h-full object-cover z-0'
                >
                    <source src="/download.mp4" type="video/mp4" />
                </video>

                {/* Navbar */}
                <div className='relative z-20'>
                    <Navbar />
                </div>

            </div>

            {/* Rest of the page content */}
            <Note />

            {/* Our Team - Chroma Grid Section */}
            <section className='relative py-16 sm:py-20 lg:py-24 bg-[var(--color-black-primary)]'>
                <div className='text-center mb-12 px-6'>
                    <p id='font2' className='text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] mb-4'>
                        The Artisans
                    </p>
                    <h2 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl font-medium mb-6'>
                        Meet Our Team
                    </h2>
                    <p id='font3' className='text-white/60 text-base sm:text-lg max-w-2xl mx-auto'>
                        The passionate individuals behind every exquisite fragrance, 
                        dedicated to the art of perfumery and the pursuit of olfactory excellence.
                    </p>
                </div>
                <LazySection
                    minHeightClassName='h-[600px] sm:h-[700px] lg:h-[800px] relative'
                    placeholder={<div className='h-full w-full bg-[var(--color-black-secondary)]/60 animate-pulse' />}
                    rootMargin='300px 0px'
                >
                    <Suspense fallback={<div className='h-full w-full bg-[var(--color-black-secondary)]/60 animate-pulse' />}>
                        <ChromaGrid
                            radius={280}
                            damping={0.4}
                            fadeOut={0.5}
                            ease="power2.out"
                        />
                    </Suspense>
                </LazySection>
            </section>

            {/* Testimonials Section */}
            <LazySection
                minHeightClassName='min-h-[560px]'
                placeholder={<div className='h-[560px] w-full bg-[var(--color-black-primary)]' />}
                rootMargin='300px 0px'
            >
                <Suspense fallback={<div className='h-[560px] w-full bg-[var(--color-black-primary)]' />}>
                    <Testimonials />
                </Suspense>
            </LazySection>

            <Footer />
        </div>
    )
}

export default Home

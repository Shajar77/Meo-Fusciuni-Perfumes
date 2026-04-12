import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import LazySection from './LazySection'

const CircularGallery = lazy(() => import('./CircularGallery'))

const Note = () => {
    return (
        <div className='bg-[var(--color-black-primary)] py-16 sm:py-20 px-6 sm:px-8'>
            {/* Image Background Container - Lazy loaded */}
            <div className='mx-4 sm:mx-6 lg:mx-12 relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden min-h-[400px]'>
                {/* Background Image - Lazy loaded with placeholder */}
                <div className='absolute inset-0 bg-[var(--color-black-secondary)] animate-pulse' />
                <img
                    src='/download (12).jpg'
                    alt='Perfume philosophy backdrop'
                    loading='lazy'
                    decoding='async'
                    fetchPriority='low'
                    className='absolute inset-0 w-full h-full object-cover transition-opacity duration-500'
                    onLoad={(e) => e.target.classList.remove('opacity-0')}
                    style={{ opacity: 0 }}
                />
                {/* Dark Overlay for Text Readability */}
                <div className='absolute inset-0 bg-black/60' />
                
                {/* Content */}
                <div className='relative z-10 p-6 sm:p-8 lg:p-12 text-center'>
                    {/* Simple Label */}
                    <p id='font2' className='text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] mb-6'>
                        Philosophy
                    </p>

                    {/* Clean Title */}
                    <h2 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl font-medium mb-8'>
                        Dear Perfume Lover
                    </h2>

                    {/* Divider */}
                    <div className='w-16 h-px bg-[var(--color-gold)]/50 mx-auto mb-8' />

                    {/* Content - Poetic Single Paragraph */}
                    <div id='font3' className='text-white/85 text-base sm:text-lg lg:text-xl leading-[1.9] mb-8 max-w-4xl mx-auto'>
                        <p className="italic">
                            In the hush of a moment, everything begins with <span className="text-[var(--color-gold)] font-semibold not-italic">sensing</span> — 
                            the delicate dance of scent weaving through memory and emotion. With eyes gently closed, 
                            we surrender to the silent conversation between soul and perfume, where aesthetics meets balance 
                            in an eternal embrace. Each fragrance is born from this alchemy: a perfumer's journey inward, 
                            <span className="text-[var(--color-gold)] font-semibold not-italic"> searching for oneself</span> through the poetry of experience. 
                            Listen closely — in every note lies a story waiting to awaken what sleeps within you, 
                            calling forth forgotten echoes of who you truly are.
                        </p>
                    </div>

                    {/* Simple Signature */}
                    <p id='font2' className='text-white/60 text-sm uppercase tracking-[0.2em] mb-10'>
                        — Meo Fusciuni
                    </p>

                    {/* Clean Button */}
                    <Link
                        to='/Perfumes'
                        id='font2'
                        className='inline-flex items-center gap-2 px-8 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] text-sm uppercase tracking-[0.25em] hover:bg-[var(--color-gold)] hover:text-[var(--color-black-primary)] transition-all duration-300 rounded-sm'
                    >
                        Explore Collection
                        <span>→</span>
                    </Link>
                </div>
            </div>

            {/* Explore Our Collection - Circular Gallery */}
            <div className='mt-16 sm:mt-20 lg:mt-24 -mx-6 sm:-mx-8'>
                {/* Section Heading */}
                <div className='text-center mb-10'>
                    <p id='font2' className='text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] mb-4'>
                        Discover
                    </p>
                    <h2 id='font1' className='text-white text-3xl sm:text-4xl lg:text-5xl font-medium'>
                        Explore Our Collection
                    </h2>
                </div>

                {/* Circular Gallery */}
                <LazySection
                    minHeightClassName='h-[420px] sm:h-[520px] lg:h-[600px] relative'
                    placeholder={<div className='h-full w-full bg-[var(--color-black-secondary)]/60 animate-pulse' />}
                    rootMargin='300px 0px'
                >
                    <Suspense fallback={<div className='h-full w-full bg-[var(--color-black-secondary)]/60 animate-pulse' />}>
                        <CircularGallery
                            bend={2}
                            textColor="#d4af37"
                            borderRadius={0.06}
                            scrollSpeed={1.5}
                            scrollEase={0.06}
                        />
                    </Suspense>
                </LazySection>

                {/* Explore More Button */}
                <div className='text-center mt-10'>
                    <Link
                        to='/Perfumes'
                        id='font2'
                        className='group inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] text-sm uppercase tracking-[0.25em] hover:bg-[var(--color-gold)] hover:text-[var(--color-black-primary)] transition-all duration-300 rounded-sm'
                    >
                        Explore More
                        <span className='transform group-hover:translate-x-2 transition-transform duration-300'>→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Note

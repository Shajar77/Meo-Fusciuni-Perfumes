import { Link } from 'react-router-dom'
import { GoHeart } from "react-icons/go";
import { perfumes, getPriceDisplay } from '../data/perfumes';

const Inventory = () => {
    return (
        <div className='bg-[var(--color-black-primary)] w-full min-h-screen'>
            {/* Premium Header Section */}
            <div className='py-16 sm:py-20 lg:py-24 border-b border-[var(--color-border)]'>
                <div className='text-center px-4'>
                    <p id='font2' className='text-[var(--color-gold)] text-xs uppercase tracking-[0.4em] mb-4'>
                        The Collection
                    </p>
                    <h1 id='font1' className='text-[var(--color-text-primary)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium mb-6'>
                        All Perfumes
                    </h1>
                    <div className='gold-divider mx-auto' />
                </div>
            </div>

            {/* Product Grid - Premium Dark */}
            <div className='w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8'>
                    {perfumes.map((perfume, index) => (
                        <Link
                            to={`/perfume/${perfume.id}`}
                            key={perfume.id}
                            className='flex flex-col group cursor-pointer rounded-xl overflow-hidden bg-[var(--color-black-secondary)] border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-700 hover-lift animate-fade-up'
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Product Image Container - Premium Dark */}
                            <div className='w-full bg-[var(--color-black-tertiary)] aspect-[3/4] overflow-hidden relative'>
                                <img
                                    src={perfume.image}
                                    alt={perfume.name}
                                    className='w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110'
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Hover Overlay */}
                                <div className='absolute inset-0 bg-[var(--color-gold)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                                {/* Quick View Button - Appears on Hover */}
                                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500'>
                                    <span id='font2' className='px-6 py-3 bg-[var(--color-black-primary)]/90 text-[var(--color-text-primary)] text-xs uppercase tracking-[0.2em] rounded-full backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
                                        Quick View
                                    </span>
                                </div>

                                {/* Heart Icon - Premium Style */}
                                <button
                                    onClick={(e) => e.preventDefault()}
                                    className='absolute top-3 right-3 w-9 h-9 bg-[var(--color-black-primary)]/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)] group/heart transition-all duration-300 hover:scale-110'
                                >
                                    <GoHeart className='text-base text-[var(--color-text-secondary)] group-hover/heart:text-[var(--color-black-primary)] transition-colors' />
                                </button>
                            </div>

                            {/* Product Info - Premium Dark */}
                            <div className='p-4 sm:p-5 flex flex-col flex-grow'>
                                {/* Product Name */}
                                <h3 id='font1' className='text-[var(--color-text-primary)] text-sm sm:text-base font-medium mb-2 group-hover:text-[var(--color-gold)] transition-colors duration-300'>
                                    {perfume.name}
                                </h3>

                                {/* Price - Gold Accent */}
                                <p id='font2' className='text-[var(--color-gold)] text-[10px] sm:text-xs tracking-wider mb-4'>
                                    {getPriceDisplay(perfume.priceSmall, perfume.priceLarge)}
                                </p>

                                {/* Add to Cart Button */}
                                <div className='mt-auto pt-3 border-t border-[var(--color-border)] group-hover:border-[var(--color-gold)]/50 transition-colors duration-300'>
                                    <div className='flex items-center justify-between text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] transition-colors duration-300'>
                                        <span id='font2' className='text-[10px] sm:text-[11px] uppercase tracking-wider'>
                                            View Details
                                        </span>
                                        <span className='transform group-hover:translate-x-1 transition-transform duration-300'>→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Inventory

import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { getPriceDisplay } from '../data/perfumes';

const GlobalSearchModal = ({ 
    isOpen, 
    onClose, 
    searchQuery, 
    setSearchQuery, 
    filteredPerfumes, 
    onResultClick 
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-[100] bg-[var(--color-black-primary)]/95 backdrop-blur-xl'>
            <div className='w-full min-h-screen'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8'>
                    {/* Search Header */}
                    <div className='flex items-center justify-between mb-12'>
                        <h2 id='font2' className='text-base sm:text-lg uppercase tracking-[0.2em] text-[var(--color-text-primary)]'>
                            Search Perfumes
                        </h2>
                        <button
                            onClick={onClose}
                            className='p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-all duration-300 hover:rotate-90'
                        >
                            <IoCloseOutline className='text-2xl' />
                        </button>
                    </div>

                    {/* Search Input - Premium Dark */}
                    <div className='relative mb-12'>
                        <IoSearchOutline className='absolute left-0 top-1/2 -translate-y-1/2 text-[var(--color-gold)] text-2xl' />
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search for a perfume...'
                            autoFocus
                            id='font3'
                            className='w-full pl-10 sm:pl-12 pr-4 py-4 sm:py-6 text-lg sm:text-2xl bg-transparent border-b-2 border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none transition-all duration-500 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]'
                        />
                    </div>

                    {/* Search Results - Premium Dark Cards */}
                    <div className='max-h-[55vh] sm:max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar'>
                        {searchQuery.length > 0 && filteredPerfumes.length === 0 && (
                            <p id='font3' className='text-center text-[var(--color-text-muted)] py-12 text-lg'>
                                No perfumes found for "{searchQuery}"
                            </p>
                        )}

                        {filteredPerfumes.length > 0 && (
                            <div className='space-y-3'>
                                {filteredPerfumes.map((perfume, index) => (
                                    <button
                                        key={perfume.id}
                                        onClick={() => onResultClick(perfume.id)}
                                        className='w-full flex items-center gap-6 p-5 bg-[var(--color-black-secondary)] border border-[var(--color-border)] hover:border-[var(--color-gold)] rounded-xl transition-all duration-500 group animate-fade-up'
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        <div className='w-20 h-20 bg-[var(--color-black-tertiary)] rounded-lg overflow-hidden flex-shrink-0'>
                                            <img
                                                src={perfume.image}
                                                alt={perfume.name}
                                                loading='lazy'
                                                decoding='async'
                                                fetchPriority='low'
                                                className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-700'
                                            />
                                        </div>
                                        <div className='flex-1 text-left'>
                                            <p id='font1' className='text-xl text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-gold)] transition-colors duration-300'>
                                                {perfume.name}
                                            </p>
                                            <p id='font2' className='text-sm text-[var(--color-gold)] tracking-wider'>
                                                {getPriceDisplay(perfume.priceSmall, perfume.priceLarge)}
                                            </p>
                                        </div>
                                        <span className='text-[var(--color-gold)] text-2xl transform group-hover:translate-x-2 transition-transform duration-300'>→</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Popular Searches - Premium Dark */}
                        {searchQuery.length === 0 && (
                            <div className='animate-fade-up'>
                                <p id='font2' className='text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-6'>
                                    Popular Searches
                                </p>
                                <div className='flex flex-wrap gap-3'>
                                    {['Isola', 'Notturno', 'Luce', 'Narcotico', 'Venezia'].map((name, index) => (
                                        <button
                                            key={name}
                                            onClick={() => setSearchQuery(name)}
                                            id='font3'
                                            className='px-6 py-3 bg-[var(--color-black-secondary)] border border-[var(--color-border)] hover:border-[var(--color-gold)] text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] rounded-full text-sm transition-all duration-300 hover:scale-105'
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalSearchModal;

import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { perfumes, getPriceDisplay } from '../data/perfumes';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const { user, logout, isAdmin } = useAuth();
    const { cartCount, favorites } = useCart();
    const navigate = useNavigate();

    // Track scroll for glassmorphism intensity
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();
    const filteredPerfumes = useMemo(() => (
        normalizedSearchQuery.length > 0
            ? perfumes.filter(p => p.name.toLowerCase().includes(normalizedSearchQuery))
            : []
    ), [normalizedSearchQuery]);

    const handleSearchClick = (id) => {
        setIsSearchOpen(false);
        setSearchQuery('');
        navigate(`/perfume/${id}`);
    };

    return (
        <>
            {/* Premium Dark Navbar with Glassmorphism */}
            <nav 
                id="font2" 
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-5 px-4 md:px-8 lg:px-12 transition-all duration-700 ease-out ${
                    scrolled 
                        ? 'bg-[var(--color-black-primary)]/90 backdrop-blur-xl border-b border-[var(--color-border)]' 
                        : 'bg-gradient-to-b from-black/60 to-transparent'
                }`}
            >
                {/* Logo - Premium Style */}
                <Link to='/' className='relative group z-10'>
                    <img 
                        src="/logo.png" 
                        className='h-8 md:h-9 lg:h-10 invert brightness-200 transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(201,169,98,0.5)]' 
                        alt="MEO FUSCIUNI" 
                        loading='eager'
                        decoding='async'
                        fetchPriority='high'
                    />
                </Link>

                {/* Desktop Navigation - Premium Links */}
                <div className='hidden md:flex items-center gap-6 lg:gap-10'>
                    {[
                        { to: '/', label: 'Home', end: true },
                        { to: '/Perfumes', label: 'Perfumes' },
                        { to: '/Brand', label: 'Brand' },
                        { to: '/Contact', label: 'Contact' }
                    ].map((item) => (
                        <NavLink 
                            key={item.to}
                            to={item.to} 
                            end={item.end}
                            className={({ isActive }) =>
                                `relative group py-2 text-[11px] lg:text-[12px] uppercase tracking-[0.1em] transition-all duration-500 ease-out ${
                                    isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-primary)] hover:text-[var(--color-gold)]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="relative z-10">{item.label}</span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-[1px] bg-[var(--color-gold)] transform origin-left transition-transform duration-500 ease-out ${
                                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Icons - Premium Dark Style */}
                <div className='hidden md:flex items-center gap-4 lg:gap-6'>
                    {/* Search */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className='p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-all duration-300 hover:scale-110'
                        aria-label="Search"
                    >
                        <IoSearchOutline className='text-xl' />
                    </button>

                    {/* Favorites */}
                    <Link 
                        to='/favorites' 
                        className='relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-all duration-300 hover:scale-110'
                    >
                        <GoHeart className='text-xl' />
                        {favorites.length > 0 && (
                            <span className='absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-gold)] text-[var(--color-black-primary)] text-[9px] font-bold rounded-full flex items-center justify-center'>
                                {favorites.length}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    {user ? (
                        <div className='relative group'>
                            <div className='w-9 h-9 rounded-full bg-[var(--color-gold)] text-[var(--color-black-primary)] flex items-center justify-center cursor-pointer text-sm font-bold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(201,169,98,0.4)]'>
                                {user.firstName.charAt(0).toUpperCase()}
                            </div>
                            {/* Dropdown - Premium Dark */}
                            <div className='absolute right-0 top-full mt-3 w-52 bg-[var(--color-black-secondary)] border border-[var(--color-border)] rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl'>
                                <p id='font2' className='px-4 py-3 text-xs text-[var(--color-text-secondary)] border-b border-[var(--color-border)]'>
                                    Hello, {user.firstName}
                                </p>
                                {isAdmin() && (
                                    <Link to='/admin' className='block px-4 py-2.5 text-sm text-[var(--color-gold)] font-medium hover:bg-[var(--color-black-tertiary)] transition-colors'>
                                        Dashboard
                                    </Link>
                                )}
                                <Link to='/profile' className='block px-4 py-2.5 text-sm text-[var(--color-text-primary)] hover:text-[var(--color-gold)] hover:bg-[var(--color-black-tertiary)] transition-all'>
                                    My Profile
                                </Link>
                                <Link to='/orders' className='block px-4 py-2.5 text-sm text-[var(--color-text-primary)] hover:text-[var(--color-gold)] hover:bg-[var(--color-black-tertiary)] transition-all'>
                                    My Orders
                                </Link>
                                <button
                                    onClick={logout}
                                    className='w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[var(--color-black-tertiary)] transition-all border-t border-[var(--color-border)] mt-1'
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link 
                            to='/login'
                            className='p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-all duration-300 hover:scale-110'
                        >
                            <LuUser className='text-xl' />
                        </Link>
                    )}

                    {/* Cart */}
                    <Link 
                        to='/cart' 
                        className='relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-all duration-300 hover:scale-110'
                    >
                        <IoBagOutline className='text-xl' />
                        {cartCount > 0 && (
                            <span className='absolute -top-0.5 -right-0.5 w-4 h-4 bg-[var(--color-gold)] text-[var(--color-black-primary)] text-[9px] font-bold rounded-full flex items-center justify-center'>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Button - Premium Dark */}
                <div className='flex md:hidden items-center gap-3'>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className='p-2 text-[var(--color-text-primary)]'
                        aria-label="Search"
                    >
                        <IoSearchOutline className='text-xl' />
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='p-2 text-[var(--color-text-primary)]'
                        aria-label="Menu"
                    >
                        {isMenuOpen ? <IoCloseOutline className='text-2xl' /> : <HiOutlineMenuAlt3 className='text-2xl' />}
                    </button>
                </div>

                {/* Mobile Menu - Full Screen Premium Dark */}
                {isMenuOpen && (
                    <div className='fixed inset-0 top-[72px] bg-[var(--color-black-primary)] z-50 md:hidden sm:top-[76px]'>
                        <div className='flex flex-col items-center py-12 gap-8'>
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/Perfumes', label: 'Perfumes' },
                                { to: '/Brand', label: 'Brand' },
                                { to: '/Contact', label: 'Contact' }
                            ].map((item, index) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to} 
                                    end={item.to === '/'}
                                    onClick={() => setIsMenuOpen(false)} 
                                    className={({ isActive }) => `
                                        text-xl sm:text-2xl uppercase tracking-[0.1em] font-light text-center px-6
                                        transition-all duration-500
                                        animate-fade-up
                                        ${isActive 
                                            ? 'text-[var(--color-gold)]' 
                                            : 'text-[var(--color-text-primary)] hover:text-[var(--color-gold)]'}
                                    `}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            <div className='flex items-center gap-8 mt-8 pt-8 border-t border-[var(--color-border)]'>
                                <Link to='/favorites' onClick={() => setIsMenuOpen(false)} className='relative text-[var(--color-text-secondary)]'>
                                    <GoHeart className='text-2xl' />
                                    {favorites.length > 0 && (
                                        <span className='absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-gold)] text-[var(--color-black-primary)] text-[9px] font-bold rounded-full flex items-center justify-center'>
                                            {favorites.length}
                                        </span>
                                    )}
                                </Link>
                                {user ? (
                                    <div className='w-10 h-10 rounded-full bg-[var(--color-gold)] text-[var(--color-black-primary)] flex items-center justify-center text-base font-bold'>
                                        {user.firstName.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <Link to='/login' onClick={() => setIsMenuOpen(false)} className='text-[var(--color-text-secondary)]'>
                                        <LuUser className='text-2xl' />
                                    </Link>
                                )}
                                <Link to='/cart' onClick={() => setIsMenuOpen(false)} className='relative text-[var(--color-text-secondary)]'>
                                    <IoBagOutline className='text-2xl' />
                                    {cartCount > 0 && (
                                        <span className='absolute -top-1 -right-1 w-4 h-4 bg-[var(--color-gold)] text-[var(--color-black-primary)] text-[9px] font-bold rounded-full flex items-center justify-center'>
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {user && (
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className='text-red-400 text-sm mt-4 uppercase tracking-wider'
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                )}

            </nav>

            {/* Premium Search Modal - Dark Theme */}
            {isSearchOpen && (
                <div className='fixed inset-0 z-[100] bg-[var(--color-black-primary)]/95 backdrop-blur-xl'>
                    <div className='w-full min-h-screen'>
                        <div className='max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8'>
                            {/* Search Header */}
                            <div className='flex items-center justify-between mb-12'>
                                <h2 id='font2' className='text-base sm:text-lg uppercase tracking-[0.2em] text-[var(--color-text-primary)]'>
                                    Search Perfumes
                                </h2>
                                <button
                                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
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
                            <div className='max-h-[55vh] sm:max-h-[60vh] overflow-y-auto'>
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
                                                onClick={() => handleSearchClick(perfume.id)}
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
            )}
        </>
    )
}

export default Navbar

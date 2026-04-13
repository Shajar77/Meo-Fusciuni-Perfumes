import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { perfumes } from '../data/perfumes';
import GlobalSearchModal from './GlobalSearchModal';
import MobileMenu from './MobileMenu';

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

                {/* Mobile Menu Component */}
                <MobileMenu 
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    favorites={favorites}
                    user={user}
                    cartCount={cartCount}
                    logout={logout}
                />

            </nav>

            <GlobalSearchModal 
                isOpen={isSearchOpen}
                onClose={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredPerfumes={filteredPerfumes}
                onResultClick={handleSearchClick}
            />
        </>
    )
}

export default Navbar

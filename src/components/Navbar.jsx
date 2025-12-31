import React, { useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const { cartCount, favorites } = useCart();
    const navigate = useNavigate();

    const perfumes = [
        { id: 1, name: 'Isola', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 2, name: '1# Nota di Viaggio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 3, name: '2# Nota di Viaggio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 4, name: '3# Nota di Viaggio', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 5, name: 'Notturno', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 6, name: 'Luce', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 7, name: 'Narcotico', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 8, name: 'Odor 93', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 9, name: 'Little Song', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 10, name: 'Magnificat', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 11, name: "L'Oblio", priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 12, name: 'Oro Rosso', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 13, name: 'Venezia', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 14, name: 'Roma', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 15, name: 'Firenze', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 16, name: 'Milano', priceSmall: '8,00 €', priceLarge: '180,00 €' },
        { id: 17, name: 'Napoli', priceSmall: '10,00 €', priceLarge: '220,00 €' },
        { id: 18, name: 'Palermo', priceSmall: '8,00 €', priceLarge: '180,00 €' },
    ];

    const filteredPerfumes = searchQuery.length > 0
        ? perfumes.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const handleSearchClick = (id) => {
        setIsSearchOpen(false);
        setSearchQuery('');
        navigate(`/perfume/${id}`);
    };

    return (
        <>
            <nav id="font2" className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white py-6 px-4 md:px-8 lg:px-12 shadow-sm'>
                {/* Logo */}
                <Link to='/'>
                    <img src="/logo.png" className='h-7 md:h-8 lg:h-9' alt="MEO FUSCIUNI" />
                </Link>

                {/* Desktop Navigation Links */}
                <div className='hidden md:flex font-semibold gap-4 lg:gap-8 uppercase text-[11px] lg:text-[13px] tracking-wide'>
                    <NavLink to='/' end className={({ isActive }) => `hover:opacity-60 transition-all duration-300 relative pb-1 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}>Home</NavLink>
                    <NavLink to='/Perfumes' className={({ isActive }) => `hover:opacity-60 transition-all duration-300 relative pb-1 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}>Perfumes</NavLink>
                    <NavLink to='/Brand' className={({ isActive }) => `hover:opacity-60 transition-all duration-300 relative pb-1 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}>Brand</NavLink>
                    <NavLink to='/Contact' className={({ isActive }) => `hover:opacity-60 transition-all duration-300 relative pb-1 ${isActive ? 'border-b-2 border-black' : 'border-b-2 border-transparent'}`}>Contact</NavLink>
                </div>

                {/* Desktop Icons */}
                <div className='hidden md:flex items-center gap-3 lg:gap-4'>
                    <span className='text-xs font-semibold mr-2'>EN</span>
                    <IoSearchOutline
                        onClick={() => setIsSearchOpen(true)}
                        className='text-lg lg:text-xl cursor-pointer hover:opacity-60 transition-opacity'
                    />

                    {/* Favorites Icon */}
                    <Link to='/favorites' className='relative'>
                        <GoHeart className='text-lg lg:text-xl cursor-pointer hover:opacity-60 transition-opacity' />
                        {favorites.length > 0 && (
                            <span className='absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>
                                {favorites.length}
                            </span>
                        )}
                    </Link>

                    {/* User Icon / Initial */}
                    {user ? (
                        <div className='relative group'>
                            <div className='w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer text-sm font-bold'>
                                {user.firstName.charAt(0).toUpperCase()}
                            </div>
                            {/* Dropdown */}
                            <div className='absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                                <p id='font2' className='px-4 py-2 text-xs text-gray-500 border-b border-gray-100'>
                                    Hello, {user.firstName}
                                </p>
                                {isAdmin() && (
                                    <Link to='/admin' className='block px-4 py-2 text-sm text-purple-600 font-semibold hover:bg-purple-50'>📊 Dashboard</Link>
                                )}
                                <Link to='/profile' className='block px-4 py-2 text-sm hover:bg-gray-50'>My Profile</Link>
                                <Link to='/orders' className='block px-4 py-2 text-sm hover:bg-gray-50'>My Orders</Link>
                                <button
                                    onClick={logout}
                                    className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50'
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to='/login'>
                            <LuUser className='text-lg lg:text-xl cursor-pointer hover:opacity-60 transition-opacity' />
                        </Link>
                    )}

                    {/* Cart Icon */}
                    <Link to='/cart' className='relative'>
                        <IoBagOutline className='text-lg lg:text-xl cursor-pointer hover:opacity-60 transition-opacity' />
                        {cartCount > 0 && (
                            <span className='absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center'>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className='flex md:hidden items-center gap-4'>
                    <IoSearchOutline
                        onClick={() => setIsSearchOpen(true)}
                        className='text-xl cursor-pointer'
                    />
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <IoCloseOutline className='text-2xl' /> : <HiOutlineMenuAlt3 className='text-2xl' />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className='fixed inset-0 top-[60px] bg-white z-50 md:hidden'>
                        <div className='flex flex-col items-center py-8 gap-6 uppercase text-sm font-semibold tracking-wide'>
                            <NavLink to='/' end onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'border-b-2 border-black pb-1' : ''}>Home</NavLink>
                            <NavLink to='/Perfumes' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'border-b-2 border-black pb-1' : ''}>Perfumes</NavLink>
                            <NavLink to='/Brand' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'border-b-2 border-black pb-1' : ''}>Brand</NavLink>
                            <NavLink to='/Meo' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'border-b-2 border-black pb-1' : ''}>MEO FUSCIUNI</NavLink>
                            <NavLink to='/Contact' onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? 'border-b-2 border-black pb-1' : ''}>Contact</NavLink>

                            <div className='flex items-center gap-6 mt-4 pt-4 border-t border-gray-200 w-48 justify-center'>
                                <Link to='/favorites' onClick={() => setIsMenuOpen(false)} className='relative'>
                                    <GoHeart className='text-xl' />
                                    {favorites.length > 0 && (
                                        <span className='absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center'>
                                            {favorites.length}
                                        </span>
                                    )}
                                </Link>
                                {user ? (
                                    <div className='w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold'>
                                        {user.firstName.charAt(0).toUpperCase()}
                                    </div>
                                ) : (
                                    <Link to='/login' onClick={() => setIsMenuOpen(false)}>
                                        <LuUser className='text-xl' />
                                    </Link>
                                )}
                                <Link to='/cart' onClick={() => setIsMenuOpen(false)} className='relative'>
                                    <IoBagOutline className='text-xl' />
                                    {cartCount > 0 && (
                                        <span className='absolute -top-2 -right-2 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center'>
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </div>

                            {user && (
                                <button
                                    onClick={() => { logout(); setIsMenuOpen(false); }}
                                    className='text-red-600 text-sm mt-4'
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Search Modal */}
            {isSearchOpen && (
                <div className='fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm'>
                    <div className='bg-white w-full'>
                        <div className='max-w-4xl mx-auto px-6 py-8'>
                            {/* Search Header */}
                            <div className='flex items-center justify-between mb-8'>
                                <h2 id='font2' className='text-lg uppercase tracking-wider'>Search Perfumes</h2>
                                <button
                                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                                >
                                    <IoCloseOutline className='text-2xl' />
                                </button>
                            </div>

                            {/* Search Input */}
                            <div className='relative mb-8'>
                                <IoSearchOutline className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl' />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Search for a perfume...'
                                    autoFocus
                                    id='font3'
                                    className='w-full pl-12 pr-4 py-4 text-lg border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent'
                                />
                            </div>

                            {/* Search Results */}
                            <div className='max-h-[60vh] overflow-y-auto'>
                                {searchQuery.length > 0 && filteredPerfumes.length === 0 && (
                                    <p id='font3' className='text-center text-gray-500 py-8'>No perfumes found for "{searchQuery}"</p>
                                )}

                                {filteredPerfumes.length > 0 && (
                                    <div className='space-y-2'>
                                        {filteredPerfumes.map((perfume) => (
                                            <button
                                                key={perfume.id}
                                                onClick={() => handleSearchClick(perfume.id)}
                                                className='w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors text-left'
                                            >
                                                <div className='w-16 h-16 bg-[#e8e8e8] rounded-lg overflow-hidden flex-shrink-0'>
                                                    <img
                                                        src='https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/07/Meo-Fusciuni-Sito-Still-Life-rfer.001-683x908.jpeg'
                                                        alt={perfume.name}
                                                        className='w-full h-full object-contain'
                                                    />
                                                </div>
                                                <div className='flex-1'>
                                                    <p id='font1' className='text-base mb-1'>{perfume.name}</p>
                                                    <p id='font2' className='text-sm text-amber-700'>{perfume.priceSmall} – {perfume.priceLarge}</p>
                                                </div>
                                                <span className='text-gray-400'>→</span>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Popular Searches (when no query) */}
                                {searchQuery.length === 0 && (
                                    <div>
                                        <p id='font2' className='text-xs uppercase tracking-wider text-gray-400 mb-4'>Popular Searches</p>
                                        <div className='flex flex-wrap gap-2'>
                                            {['Isola', 'Notturno', 'Luce', 'Narcotico', 'Venezia'].map((name) => (
                                                <button
                                                    key={name}
                                                    onClick={() => setSearchQuery(name)}
                                                    id='font3'
                                                    className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors'
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
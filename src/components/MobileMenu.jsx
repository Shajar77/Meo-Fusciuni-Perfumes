import { NavLink, Link } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { IoBagOutline } from "react-icons/io5";

const MobileMenu = ({ 
    isOpen, 
    onClose, 
    favorites, 
    user, 
    cartCount, 
    logout 
}) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 top-[72px] bg-black z-[100] md:hidden sm:top-[76px] overflow-y-auto'>
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
                        onClick={onClose} 
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
                    <Link to='/favorites' onClick={onClose} className='relative text-[var(--color-text-secondary)]'>
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
                        <Link to='/login' onClick={onClose} className='text-[var(--color-text-secondary)]'>
                            <LuUser className='text-2xl' />
                        </Link>
                    )}
                    <Link to='/cart' onClick={onClose} className='relative text-[var(--color-text-secondary)]'>
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
                        onClick={() => { logout(); onClose(); }}
                        className='text-red-400 text-sm mt-4 uppercase tracking-wider'
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;

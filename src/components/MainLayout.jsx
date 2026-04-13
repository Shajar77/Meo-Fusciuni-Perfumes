import { Outlet, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
    const location = useLocation();
    
    // Pages with absolute transparent navbars
    const transparentNavPages = ['/', '/Brand', '/brand'];
    const isTransparent = transparentNavPages.includes(location.pathname);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='w-full bg-[var(--color-black-primary)] min-h-screen flex flex-col'>
            <Navbar />
            <main className={`flex-grow w-full max-w-[100vw] overflow-x-hidden ${!isTransparent ? 'pt-[72px] sm:pt-[76px] lg:pt-[80px]' : ''}`}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;

import React from 'react'
import Navbar from '../components/Navbar'
import Note from '../components/Note'
import Items from '../components/Items'
import Footer from '../components/Footer'
const Home = () => {
    return (
        <div className='w-full overflow-x-hidden'>
            {/* Video section with Navbar overlay */}
            <div className='relative min-h-screen w-full overflow-hidden'>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className='absolute top-0 left-0 w-full h-full object-cover z-0'
                >
                    <source src="/Meo Fusciuni  Isola Video Ufficiale 1440p.webm" type="video/webm" />

                </video>
                <div className='relative z-10'>
                    <Navbar />
                </div>
            </div>
            <Note />
            <Items />
            <Footer />

        </div>
    )
}

export default Home

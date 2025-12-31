import React from 'react'
import Navbar from '../components/Navbar'
import Inventory from '../components/Inventory'
import Footer from '../components/Footer'

const Perfumes = () => {
    return (
        <div className='w-full'>
            <Navbar />
            {/* Spacer for fixed navbar */}
            <div className='pt-[72px] sm:pt-[76px] lg:pt-[80px]'>
                <Inventory />
                <Footer />
            </div>
        </div>
    )
}

export default Perfumes
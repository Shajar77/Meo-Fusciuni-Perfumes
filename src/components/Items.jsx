import React from 'react'
import { Link } from 'react-router-dom'

const Items = () => {
    const items = [
        {
            id: 1,
            image: 'https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/10/meo-fusciuni-memorie-di-viaggio.jpeg',
            title: 'TRAVEL',
            subtitle: 'MEMORIES',
            collection: 'FIND OUT MORE',
            description: 'Here we gather the most meaningful journeys of our lives. Each package tells the metamorphosis of our soul. In the journey lies the search — the experience that becomes life.'
        },
        {
            id: 2,
            image: 'https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/10/meo-fusciuni-autoritratti-luminosi.jpeg',
            title: 'LUMINOUS',
            subtitle: 'SELF-PORTRAITS',
            collection: 'FIND OUT MORE',
            description: 'A collection in which time remains suspended, between silence and light. Waking becomes slow, awareness, and scent. In the light, the stillness of the body, existence, and the guarding of the soul.'
        },
        {
            id: 3,
            image: 'https://www.meofusciuni.com/en/wp-content/uploads/sites/2/2025/10/meo-fusciuni-autoritratti-oscuri.jpeg',
            title: 'DARK',
            subtitle: 'SELF-PORTRAITS',
            collection: 'FIND OUT MORE',
            description: 'In darker moments, I searched for the deep meaning of my work. Existence is a timeless riddle. The perfume becomes the abyss in which one understands oneself.'
        }
    ]

    return (
        <div className='w-full bg-black'>
            <div className='flex flex-col lg:flex-row'>
                {items.map((item) => (
                    <Link
                        key={item.id}
                        to='/Perfumes'
                        className='w-full lg:w-1/3 relative px-4 sm:px-5 mb-8 lg:mb-0 group cursor-pointer'
                    >
                        <div className='relative w-full h-[60vh] sm:h-[65vh] overflow-hidden'>
                            {/* Image with hover animation */}
                            <img
                                src={item.image}
                                alt={`${item.title} ${item.subtitle}`}
                                className='w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110'
                            />

                            {/* Overlay that becomes more transparent on hover */}
                            <div className='absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/70 to-transparent pt-32 pb-10 px-6 transition-all duration-500 group-hover:from-black/70 group-hover:via-black/50'>
                                <div className='text-center transform transition-transform duration-500 group-hover:-translate-y-2'>

                                    <h2 id='font1' className='text-white text-[28px] sm:text-[32px] lg:text-[38px] leading-none mb-0 tracking-tight font-bold'>
                                        {item.title}
                                    </h2>
                                    <h2 id='font1' className='text-white text-[28px] sm:text-[32px] lg:text-[38px] leading-[1.2] mb-3 tracking-tight font-bold'>
                                        {item.subtitle}
                                    </h2>

                                    {/* Find Out More */}
                                    <p id='font2' className='text-white text-[9px] sm:text-[10px] mb-5 tracking-[0.2em] uppercase opacity-90 transition-opacity duration-500 group-hover:opacity-100'>
                                        {item.collection}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Description Below Image */}
                        <div className='bg-black px-4 sm:px-8 py-6 text-center'>
                            <p id='font1' className='text-white mt-[-10px] text-[14px] sm:text-[15px] lg:text-[17px] leading-5 sm:leading-6 mx-auto max-w-[580px]'>
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Items
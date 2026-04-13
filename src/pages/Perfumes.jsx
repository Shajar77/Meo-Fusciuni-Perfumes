import Inventory from '../components/Inventory'
import SEO from '../components/SEO'

const Perfumes = () => {
    return (
        <div className='w-full bg-[var(--color-black-primary)] min-h-screen'>
            <SEO title="Collection" description="Explore our exclusive collection of luxury handcrafted fragrances." />
            
            <div className='w-full'>
                <Inventory />
            </div>
        </div>
    )
}

export default Perfumes
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AdminLayout = () => {
    return (
        <div className='w-full min-h-screen bg-gray-50 flex flex-col'>
            <Navbar />
            <div className='flex-grow w-full pt-[72px] sm:pt-[76px] lg:pt-[80px]'>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

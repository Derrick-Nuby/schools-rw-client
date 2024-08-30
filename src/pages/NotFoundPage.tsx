import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
    return (
        <main className='bg-black text-secondary '>
            <div className='flex flex-col text-center md:text-left md:flex-row items-center h-[100vh] justify-center gap-6'>
                <div className='text-[70px]'>404</div>
                <div className='w-[50%] h-[1px] md:w-[1px] md:h-[80px] bg-secondary'></div>
                <div className='font-extralight'>The Job You are looking for has been deleted or the deadline has reached. <br /> Please contact the site administrator for more assistance<br /> Go to <a href="/" className='text-link-blue'><FaLocationArrow className='inline mr-1 ml-3' /> Internships page</a></div>
            </div>
        </main>
    );
};

export default NotFoundPage;
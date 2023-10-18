import React from 'react';
import preview from '../../../public/preview.jpg'

interface MemberPostProps {
  image: string;
  title: string;
  description: string;
}

export const MemberPost: React.FC<MemberPostProps> = ({ image, title, description }) => {
  return (
    <div className='relative overflow-hidden bg-white rounded-lg shadow-lg w-full'>
      <img src={preview} alt={title} className='w-full h-48 object-cover' />
      <div className='absolute inset-0 bg-opacity-75 bg-gray-800 backdrop-blur-md flex items-center justify-center'>
        <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>
          Subscribe to see this post
        </button>
      </div>
      <div className='p-4'>
        <h2 className='text-lg font-semibold'>
          {title}
        </h2>
        <p className='text-gray-600'>
          {description}
        </p>
      </div>
    </div>
  );
};

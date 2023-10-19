import React from 'react';

interface MemberPostProps {
  image: string;
  title: string;
  description: string;
  isVisible: boolean;
}

export const MemberPost: React.FC<MemberPostProps> = ({ image, title, description, isVisible }) => {
  return (
    <div className='relative overflow-hidden bg-white rounded-lg shadow-md w-full'>
      <img src={image} alt={title} className='w-full h-48 object-cover' />
      {isVisible ? (
        <div className='p-4'>
          <h2 className='text-lg font-semibold'>
            {title}
          </h2>
          <p className='text-gray-600'>
            {description}
          </p>
        </div>
      ) : (
        <div className='absolute inset-0 bg-opacity-75 bg-gray-800 backdrop-blur-md flex items-center justify-center'>
          <button className='bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded'>
            Subscribe to see this post
          </button>
        </div>
      )}
    </div>
  );
};
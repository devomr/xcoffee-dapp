import HeartIcon from 'assets/img/heart.svg?react';

export const Footer = () => {
  return (
    <footer className='mx-auto w-full py-5 px-6 text-center text-gray-400 sm:px-20'>
      <div className='flex justify-between text sm text-gray-400'>
        <a
          className='text-gray-400 text-sm hover:cursor-pointer hover:underline'
          href='/disclaimer'
        >
          Disclaimer
        </a>
        <a
          target='_blank'
          className='flex items-center text-sm hover:underline'
          href='https://multiversx.com/'
        >
          Made with <HeartIcon className='mx-1 fill-red-400' /> by DevOmr
        </a>
      </div>
    </footer>
  );
};

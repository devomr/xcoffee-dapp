import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


interface SubscriptionCardProps {
  title: string;
  benefits: string[];
  price: number;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, benefits, price }) => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-6 mb-4 w-full">
      <div>
        <h2 className="text-2xl font-semibold text-center mb-5">{title}</h2>
        <ul className="list-disc list-inside mb-5">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex gap-3 items-start mb-3">
              <FontAwesomeIcon icon={faCheck} size='sm' className='text-green-500 text-xl' />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
      <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none hover:bg-blue-100 hover:text-blue-700 ">
        Subscribe for {price} EGLD
      </button>
    </div>
  );
};

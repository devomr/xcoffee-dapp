import React from 'react';
import { addSecondsToCurrentDate } from 'utils/date.utils';
import { Subscription } from 'types/subscription.types';
import { Button } from 'components/Button';


interface SubscriptionAlertProps {
  subscription: Subscription;
}

export const SubscriptionAlert: React.FC<SubscriptionAlertProps> = ({ subscription }) => {
  const handleSearchButtonClick = async () => {

  };

  return (
    <div className='bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-5 w-full' role='alert'>
      <div className='flex items-center  gap-3'>
        <span className='text-sm'>
          You have a subscription valid until {addSecondsToCurrentDate(subscription.remainingTime).toLocaleString()}
        </span>
        <Button
          className='bg-red-500 text-white font-semibold py-2 px-4 rounded focus:outline-none hover:bg-red-100 hover:text-red-700 w-auto'
          onClick={handleSearchButtonClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

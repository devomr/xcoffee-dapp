import React from 'react';
import { addSecondsToCurrentDate } from 'utils/date.utils';
import { Subscription } from 'types/subscription.types';
import { Button } from 'components/Button';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { SessionEnum } from 'localConstants';
import { useSendUnsubscribeTransaction } from 'hooks/transactions/useSendUnsubscribeTransaction';

interface SubscriptionAlertProps {
  subscription: Subscription;
}

export const SubscriptionAlert: React.FC<SubscriptionAlertProps> = ({ subscription }) => {
  const { hasPendingTransactions } = useGetPendingTransactions();
  const {
    sendUnsubscribeTransactionFromAbi
  } = useSendUnsubscribeTransaction(SessionEnum.abiDonateSessionId);


  const onSendUnsubscribeTransaction = async () => {
    await sendUnsubscribeTransactionFromAbi(subscription.subscriptionId);
  };

  return (
    <div className='bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-5 w-full' role='alert'>
      <div className='flex items-center justify-between gap-3'>
        <span className='text-sm'>
          You have a subscription valid until {addSecondsToCurrentDate(subscription.remainingTime).toLocaleDateString()}
        </span>
        <Button
          className='bg-red-500 text-white font-semibold py-2 px-4 rounded focus:outline-none hover:bg-red-100 hover:text-red-700 w-auto'
          disabled={hasPendingTransactions}
          onClick={onSendUnsubscribeTransaction}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

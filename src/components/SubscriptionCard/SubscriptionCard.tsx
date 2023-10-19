import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { SUBSCRIPTION_PERIOD_IN_DAYS } from 'config/config.devnet';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks/account/useGetIsLoggedIn';
import { useGetPendingTransactions } from '@multiversx/sdk-dapp/hooks/transactions/useGetPendingTransactions';
import { useSendSubscribeTransaction } from 'hooks/transactions/useSendSubscribeTransaction';
import { RouteNamesEnum, SessionEnum } from 'localConstants';
import { Button } from 'components/Button';
import { Link } from 'react-router-dom';
import { buildRouteWithCallback } from 'utils';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks/account/useGetAccountInfo';


interface SubscriptionCardProps {
  title: string;
  benefits: string[];
  price: number;
  creatorAddress: string;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ title, benefits, price, creatorAddress }) => {
  const { address } = useGetAccountInfo();
  const isLoggedIn = useGetIsLoggedIn();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const {
    sendSubscribeTransactionFromAbi
  } = useSendSubscribeTransaction(SessionEnum.abiDonateSessionId);


  const onSendSubscribeTransaction = async () => {
    const convertedAmount = (Math.pow(10, 18) * price).toString(10);
    const subscriptionPeriodSeconds = 24 * 60 * 60 * SUBSCRIPTION_PERIOD_IN_DAYS;
    await sendSubscribeTransactionFromAbi(creatorAddress, convertedAmount, subscriptionPeriodSeconds);
  };

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

      <div>
        {isLoggedIn ? (
          <Button
            className='bg-blue-500 text-white font-semibold py-3 px-4 rounded w-full focus:outline-none hover:bg-blue-100 hover:text-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70'
            disabled={hasPendingTransactions || (creatorAddress === address)}
            onClick={onSendSubscribeTransaction}>
            Subscribe for {price} EGLD
          </Button>
        ) : (

          <Link to={buildRouteWithCallback(RouteNamesEnum.unlock, location.pathname)}
            className='bg-blue-500 text-white text-center font-semibold py-3 px-4 rounded w-full block focus:outline-none hover:bg-blue-100 hover:text-blue-700 '>
            Connect wallet to subscribe
          </Link>
        )}
      </div>
    </div >
  );
};

import { useState } from 'react';
import { Button, MxLink } from 'components';
import { useGetIsLoggedIn, useGetPendingTransactions, useSendDonateTransaction } from 'hooks';
import { RouteNamesEnum, SessionEnum } from 'localConstants';
import { Creator } from 'types/creator.types';
import { Link, useLocation } from 'react-router-dom';
import { buildRouteWithCallback } from 'utils';

interface DonnationFromProps {
  creator: Creator;
}

export const DonationForm: React.FC<DonnationFromProps> = ({ creator }) => {
  const location = useLocation();
  const isLoggedIn = useGetIsLoggedIn();
  const { hasPendingTransactions } = useGetPendingTransactions();
  const {
    sendDonateTransactionFromAbi
  } = useSendDonateTransaction(SessionEnum.abiDonateSessionId);


  const [donationState, setDonationState] = useState({
    amount: 0.1,
    name: '',
    message: ''
  });

  const handleDonationFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setDonationState({
      ...donationState,
      [name]: value
    });
  }

  const onSendDonateTransaction = async () => {
    let convertedAmount = (Math.pow(10, 18) * donationState.amount).toString(10);
    let receiverAddress = creator.address;
    await sendDonateTransactionFromAbi(receiverAddress, donationState.name, donationState.message, convertedAmount);
  };


  return (
    <div className='flex flex-col bg-white shadow-md p-6 rounded-md w-full'>
      <h2 className='text-lg font-extrabold leading-snug mb-3'>Support creator 🤝</h2>
      <form className="rounded">
        <div className='flex justify-between border rounded p-3 mb-3'>
          <div className='flex gap-2 items-center'>
            <div className='bg-egld-icon bg-contain bg-no-repeat w-5 h-5 bg-center'></div>
            <div>EGLD</div>
          </div>
          <div>
            <input className="text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-20 max-w-full" type="number" min={0.1}
              step={0.1} name="amount" value={donationState.amount} onChange={handleDonationFormChange} />
          </div>
        </div>

        <div>
          <input className="border border-grey-200 rounded p-3 mb-3 resize-none w-full" type="text" placeholder='Add your name (required)'
            name="name" value={donationState.name} onChange={handleDonationFormChange} required />
        </div>
        <textarea className="border border-grey-200 rounded p-3 mb-3 resize-none w-full" placeholder='Add your message (optional)' rows={5} name="message" value={donationState.message} onChange={handleDonationFormChange}
        ></textarea>

        <div className=''>
          {isLoggedIn ? (
            <Button
              className='bg-blue-500 text-white font-semibold py-3 px-4 rounded w-full focus:outline-none hover:bg-blue-100 hover:text-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70'
              disabled={hasPendingTransactions}
              onClick={onSendDonateTransaction}>
              Support now ({donationState.amount} EGLD)
            </Button>
          ) : (

            <Link to={buildRouteWithCallback(RouteNamesEnum.unlock, location.pathname)}
              className='bg-blue-500 text-white text-center font-semibold py-3 px-4 rounded w-full block focus:outline-none hover:bg-blue-100 hover:text-blue-700 '>
              Connect wallet to support
            </Link>
          )}
        </div>


      </form>
    </div >
  );
};

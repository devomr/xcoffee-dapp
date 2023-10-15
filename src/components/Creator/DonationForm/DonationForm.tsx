import { useState } from 'react';
import { Button } from 'components';
import { useGetIsLoggedIn, useGetPendingTransactions, useSendDonateTransaction } from 'hooks';
import { SessionEnum } from 'localConstants';
import { Creator } from 'types/creator.types';

interface DonnationFromProps {
  creator: Creator;
}

export const DonationForm: React.FC<DonnationFromProps> = ({ creator }) => {
  const [amount, setAmount] = useState(0.1);
  const [message, setMessage] = useState('');
  const isLoggedIn = useGetIsLoggedIn();

  const { hasPendingTransactions } = useGetPendingTransactions();
  const {
    sendDonateTransactionFromAbi,
    transactionStatus
  } = useSendDonateTransaction(SessionEnum.abiDonateSessionId);


  // 👇️ called every time input's value changes
  const handleAmountChange = (event: { target: { value: string; }; }) => {
    setAmount(parseFloat(event.target.value));
  };

  const onSendDonateTransaction = async () => {
    let convertedAmount = (Math.pow(10, 18) * amount).toString(10);
    let receiverAddress = creator.address;
    let name = 'MyName';
    await sendDonateTransactionFromAbi(receiverAddress, name, message, convertedAmount);
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
              step={0.1} onChange={handleAmountChange}
              value={amount} />
          </div>
        </div>

        <textarea className="border border-grey-200 rounded p-3 resize-none w-full" placeholder='Add your message (optional)' rows={5} value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <Button
          className='bg-blue-500 text-white font-semibold py-3 px-4 rounded w-full focus:outline-none hover:bg-blue-100 hover:text-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70'
          disabled={!isLoggedIn || hasPendingTransactions}
          onClick={onSendDonateTransaction}>
          Support now ({amount} EGLD)
        </Button>
      </form>
    </div>
  );
};

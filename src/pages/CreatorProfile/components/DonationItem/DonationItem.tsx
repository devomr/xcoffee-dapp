import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { DonationTransaction } from 'types/donationTransaction.types';
import { Link } from 'react-router-dom';
import { EXPLORER_URL } from 'config';
import { FormatAmount } from '@multiversx/sdk-dapp/UI';

interface DonationTransactionProps {
  donationTransaction: DonationTransaction;
}

export const DonationItem: React.FC<DonationTransactionProps> = ({ donationTransaction }) => {
  return (
    <div className='flex justify-between bg-blue-50 p-4 mb-3 w-full rounded-md border border-blue-100'>
      <div className='flex flex-col'>
        <p>
          <Link to={`${EXPLORER_URL}/accounts/${donationTransaction.senderAddress}`} target='_blank'>
            <span className='font-bold underline'>{donationTransaction.name}</span>
          </Link> bought you a xCoffee with <span className='font-bold'><FormatAmount value={donationTransaction.amount} /> </span> 🎉
        </p>
        {donationTransaction.message && (
          <p className='bg-white p-2 mt-3 rounded-md'>
            {donationTransaction.message}
          </p>
        )}
      </div>
      <div>
        <Link to={`${EXPLORER_URL}/transactions/${donationTransaction.txHash}`} className='bg-transparent' target='_blank'>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='sm' />
        </Link>
      </div>
    </div>

  );
};


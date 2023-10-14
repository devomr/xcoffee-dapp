import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { DonationTransaction } from 'types/donationTransaction.types';
import { MxLink } from 'components/MxLink';
import { RouteNamesEnum } from 'localConstants';

interface DonationTransactionProps {
  donationTransaction: DonationTransaction;
}

export const DonationItem: React.FC<DonationTransactionProps> = ({ donationTransaction }) => {
  return (
    <div className='flex justify-between bg-blue-50 p-4 mb-3 w-full rounded-md border border-blue-100'>
      <div className='flex flex-col'>
        <p>
          <span className='font-bold'>{donationTransaction.supporter}</span> bought you a xCoffee with <span className='font-bold'>{donationTransaction.amount} EGLD</span> 🎉
        </p>
        <p className='bg-white p-2 mt-3 rounded-md'>
          {donationTransaction.message}
        </p>
      </div>
      <div>
        <MxLink to={RouteNamesEnum.unlock} className='bg-transparent'>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} size='sm' />
        </MxLink>
      </div>
    </div>

  );
};


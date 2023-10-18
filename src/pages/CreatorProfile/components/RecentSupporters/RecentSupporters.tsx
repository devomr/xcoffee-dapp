import { DonationItem } from 'components/Creator/DonationItem';
import { DonationTransaction } from 'types/donationTransaction.types';

interface RecentSupportersProps {
  donationsTransactions: DonationTransaction[]
}

export const RecentSupporters: React.FC<RecentSupportersProps> = ({ donationsTransactions }) => {

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mb-5'>
        <h2 className='text-lg font-bold mb-3'>My recent supporters</h2>
        <p className='text-sm text-gray-500'>
          You want to be here? Then by me some coffee ☕
        </p>
      </div>

      <div className='w-full'>
        {donationsTransactions && donationsTransactions.length > 0 ? (
          donationsTransactions.map((item) => (
            <DonationItem key={item.txHash} donationTransaction={item} />
          ))
        ) : (
          'No coffee available for the moment. Be the first one listed here.'
        )}
      </div>
    </div>
  );
};

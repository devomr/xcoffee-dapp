import { SubscriptionCard } from 'components/SubscriptionCard';
import { useUserSubscriptionForCreator } from 'hooks/useUserSubscriptionForCreator';
import { Creator } from 'types/creator.types';

interface MembershipPlansProps {
  creator: Creator;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({ creator }) => {
  const { subscription } = useUserSubscriptionForCreator(creator.address);


  const addSecondsToCurrentDate = (seconds: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + seconds * 1000);

    return newDate;
  }

  const proBenefits = [
    'Access to private community',
    'Access to private posts for members',
  ];

  const premiumBenefits = [
    'Access to private community',
    'Access to private posts for members',
    'Monthly consulting calls'
  ]



  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center mb-5'>
        <h2 className='text-lg font-bold mb-3'>My membership plans</h2>
        <p className='text-sm text-gray-500'>
          You want to support me and have access to exclusive benefits? Choose what plan is best for you
        </p>
      </div>
      {
        subscription && subscription.status === 'active_subscription' ? (
          <div className='bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-5 w-full' role='alert'>
            <div className='flex items-center gap-3'>
              <span className='text-sm'>
                You have a subscription valid until {addSecondsToCurrentDate(subscription.remainingTime).toISOString()}
              </span>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center'>
            <SubscriptionCard title='Pro' benefits={proBenefits} price={0.1} address={creator.address} />
            <SubscriptionCard title='Premium' benefits={premiumBenefits} price={0.2} address={creator.address} />
          </div>
        )
      }

    </div>
  );
};

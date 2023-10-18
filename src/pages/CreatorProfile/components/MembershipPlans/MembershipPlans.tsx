import { SubscriptionCard } from 'components/SubscriptionCard';

export const MembershipPlans = () => {

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
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center'>
        <SubscriptionCard title='Pro' benefits={proBenefits} price={1} />
        <SubscriptionCard title='Premium' benefits={premiumBenefits} price={3} />
      </div>
    </div>
  );
};

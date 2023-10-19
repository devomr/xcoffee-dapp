import { SubscriptionAlert } from 'components/SubscriptionAlert';
import { SubscriptionCard } from 'components/SubscriptionCard';
import { useEffect, useState } from 'react';
import { getCreatorSubscriptionPlans } from 'services/subscriptions.service';
import { Creator } from 'types/creator.types';
import { SubscriptionPlan } from 'types/subscription-plan.types';
import { Subscription } from 'types/subscription.types';

interface MembershipPlansProps {
  creator: Creator;
  subscription: Subscription | null;
}

export const MembershipPlans: React.FC<MembershipPlansProps> = ({ creator, subscription }) => {

  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    setSubscriptionPlans(getCreatorSubscriptionPlans());
  }, []);

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
          // Show user the subscription alert if he has an active subscription
          <SubscriptionAlert subscription={subscription} />
        ) : (
          // Show user the available subscription plans
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center'>
            {subscriptionPlans && subscriptionPlans.length > 0 ? (
              subscriptionPlans.map((item) => (
                <SubscriptionCard key={item.title} title={item.title} benefits={item.benefits} price={item.price} creatorAddress={creator.address} />
              ))
            ) : (
              'No available posts for the moment.'
            )}
          </div>
        )
      }
    </div>
  );
};

import { useState, useEffect } from 'react';
import { Subscription } from 'types/subscription.types';
import { getUserSubscription } from 'services/subscriptions.service';

/**
 * Hook used to retrieve the creator details by his wallet address.
 * @param address Wallet address
 * @returns An object that contains the creator, error and loading flag
 */
export function useUserSubscriptionForCreator(
  userAddress: string,
  creatorAddress: string
) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userAddress || !creatorAddress) {
      return;
    }

    getUserSubscription(userAddress, creatorAddress)
      .then((data) => setSubscription(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [userAddress, creatorAddress]);

  return { subscription, loading, error };
}

import { useState, useEffect } from 'react';
import { Subscription } from 'types/subscription.types';
import { getUserSubscription } from 'services/subscriptions.service';

/**
 * Hook used to retrieve the creator details by his wallet address.
 * @param creatorAddress Wallet address
 * @returns An object that contains the creator, error and loading flag
 */
export function useUserSubscriptionForCreator(creatorAddress: string) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!creatorAddress) {
      return;
    }

    getUserSubscription(creatorAddress)
      .then((data) => setSubscription(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [creatorAddress]);

  return { subscription, loading, error };
}

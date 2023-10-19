import { useState, useEffect } from 'react';
import { Subscription } from 'types/subscription.types';
import { getUserSubscription } from 'services/subscriptions.service';
import { HttpResponse } from 'types/http-response.types';

/**
 * Hook used to retrieve the creator details by his wallet address.
 * @param creatorAddress Wallet address
 * @returns An object that contains the subscription, error and loading flag
 */
export function useUserSubscriptionForCreator(
  creatorAddress?: string
): HttpResponse<Subscription | null> {
  const [data, setData] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!creatorAddress) {
      // Reset the state when creatorAddress is null
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    getUserSubscription(creatorAddress)
      .then((data: Subscription) => {
        setData(data);
        setError(null);
      })
      .catch((error: Error) => {
        setData(null);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [creatorAddress]);

  return { data, loading, error };
}

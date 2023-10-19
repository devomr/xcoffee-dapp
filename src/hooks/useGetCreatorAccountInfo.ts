import { useState, useEffect } from 'react';
import { Creator } from 'types/creator.types';
import { HttpResponse } from 'types/http-response.types';
import { findCreatorByAddress } from 'services/creators.service';

/**
 * Hook used to retrieve the creator details by his wallet address.
 * @param address Wallet address
 * @returns An object that contains the creator, error and loading flag
 */
export function useGetCreatorAccountInfo(
  address?: string
): HttpResponse<Creator | null> {
  const [data, setData] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) {
      // Reset the state when creatorAddress is null
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    findCreatorByAddress(address)
      .then((data: Creator) => {
        setData(data);
        setError(null);
      })
      .catch((error: Error) => {
        setData(null);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [address]);

  return { data, loading, error };
}

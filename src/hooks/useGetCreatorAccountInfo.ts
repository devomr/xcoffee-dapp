import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from 'config';
import { Creator } from 'types/creator.types';

/**
 * Hook used to retrieve the creator details by his wallet address.
 * @param address Wallet address
 * @returns An object that contains the creator, error and loading flag
 */
export function useGetCreatorAccountInfo(address: string) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!address) {
      return;
    }

    const findCreatorByAddress = async (address: string) => {
      try {
        const response = await axios.get(`/creators/search/${address}`, {
          baseURL: API_URL
        });
        setCreator(response.data);
        return response;
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    findCreatorByAddress(address);
  }, [address]);

  return { creator, loading, error };
}

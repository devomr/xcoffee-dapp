import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from 'config';
import { Creator } from 'types/creator.types';

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
        const response = await axios.get(
          `${API_URL}/creators/search/${address}`
        );
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

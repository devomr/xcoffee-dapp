import axios from 'axios';
import { API_URL } from 'config';

/**
 * Get the user subscription to a creator
 * @param creatorAddress Wallet address of the creator
 * @returns Subscription object
 */
export const getUserSubscription = async (creatorAddress: string) => {
  try {
    const response = await axios.get(
      `/xcoffee/subscription-duration/${creatorAddress}`,
      {
        baseURL: API_URL
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

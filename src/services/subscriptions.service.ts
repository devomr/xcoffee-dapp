import axios from 'axios';
import { API_URL } from 'config';

/**
 * Get the user subscription to a creator
 * @param userAddress Wallet address of the user
 * @param creatorAddress Wallet address of the creator
 * @returns Subscription object
 */
export const getUserSubscription = async (
  userAddress: string,
  creatorAddress: string
) => {
  try {
    const response = await axios.get(
      `${API_URL}/xcoffee/subscription-duration/${userAddress}/${creatorAddress}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

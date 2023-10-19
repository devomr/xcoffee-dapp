import axios from 'axios';
import { API_URL } from 'config';
import { SubscriptionPlan } from 'types/subscription-plan.types';

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

// Mock subscription plans for the moment
const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    title: 'Pro',
    benefits: [
      'Access to private community',
      'Access to private posts for members'
    ],
    price: 0.1
  },
  {
    title: 'Premium',
    benefits: [
      'Access to private community',
      'Access to private posts for members',
      'Monthly consulting calls'
    ],
    price: 0.3
  }
];

export const getCreatorSubscriptionPlans = () => {
  return MOCK_SUBSCRIPTION_PLANS;
};

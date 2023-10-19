import axios from 'axios';
import { API_URL } from 'config';
import { Creator } from 'types/creator.types';

/**
 * Create profile of a creator account
 * @param creator Creator object
 * @returns New created object
 */
export const createProfile = async (creator: Creator) => {
  try {
    const response = await axios.post(`${API_URL}/creators`, creator);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/**
 * Update creator profile details
 * @param creator Creator object
 * @returns New updated object
 */
export const updateProfile = async (creator: Creator) => {
  try {
    const response = await axios.put(`${API_URL}/creators`, creator);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/**
 * Find creator by his wallet address.
 * @param address Wallet address
 * @returns Creator object
 */
export const findCreatorByAddress = async (address: string) => {
  try {
    const response = await axios.get(`${API_URL}/creators/search/${address}`);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/**
 * Find the list of last 10 creators registered on the application
 * @returns List of creator objects
 */
export const findLastCreators = async () => {
  try {
    const response = await axios.get(`${API_URL}/creators/last-creators`);
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

import axios from 'axios';
import { API_URL } from 'config';
import { AddCreator, Creator, UpdateCreator } from 'types/creator.types';

/**
 * Create profile of a creator account
 * @param creator Creator object
 * @returns New created object
 */
export const createProfile = async (addCreator: AddCreator) => {
  try {
    const response = await axios.post('creators', addCreator, {
      baseURL: API_URL
    });
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
export const updateProfile = async (updateCreator: UpdateCreator) => {
  try {
    const response = await axios.put('/creators', updateCreator, {
      baseURL: API_URL
    });
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
    const response = await axios.get(`/creators/search/${address}`, {
      baseURL: API_URL
    });
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
    const response = await axios.get('/creators/last-creators', {
      baseURL: API_URL
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

/**
 * Find the list all available creators
 * @returns List of creator objects
 */
export const findAvailableCreators = async () => {
  try {
    const response = await axios.get('creators', {
      baseURL: API_URL
    });
    return response;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

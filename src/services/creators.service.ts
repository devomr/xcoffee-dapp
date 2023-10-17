import axios from 'axios';
import { API_URL } from 'config';
import { Creator } from 'types/creator.types';

export const saveProfile = async (creator: Creator) => {
  // userData is an object containing the user data to be sent in the request body

  try {
    const response = await axios.post(`${API_URL}/creators`, creator);
    return response.data;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

export const findCreatorByAddress = async (address: string) => {
  try {
    const response = await axios.get(`${API_URL}/creators/search/${address}`);
    return response;
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

export const findTopSupportedCreators = async () => {
  try {
    const response = await axios.get(`${API_URL}/creators/top-supported`);

    return response;
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

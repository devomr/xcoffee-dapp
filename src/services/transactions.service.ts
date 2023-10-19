import axios from 'axios';
import { API_URL } from 'config';

export const findDonationsHistory = async (address: string) => {
  try {
    const response = await axios.get(`/stats/donations/${address}`);
    return response;
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

export const getCountOfSupporters = async (address: string) => {
  try {
    const response = await axios.get(`/stats/supporters/${address}`, {
      baseURL: API_URL
    });
    return response;
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
};

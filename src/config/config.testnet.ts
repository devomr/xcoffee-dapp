import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const contractAddress = '';
export const API_URL = 'https://testnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.testnet;
export const EXPLORER_URL =
  'https://testnet-explorer.multiversx.com/transactions';
export const SUBSCRIPTION_PERIOD_IN_DAYS = 30;

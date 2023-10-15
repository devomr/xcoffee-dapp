import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgq2kyfdk57vf8z4uht3c25wuz8gu7n0mck7j4q58f7s7';
export const API_URL = 'https://devnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const EXPLORER_URL =
  'https://devnet-explorer.multiversx.com/transactions';

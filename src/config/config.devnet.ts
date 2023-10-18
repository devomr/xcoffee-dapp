import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqvhk2wnx5tgzvlalzdt7yus5ygue084hx7j4qka2gz6';
export const API_URL = 'https://localhost:3001';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const EXPLORER_URL = 'https://devnet-explorer.multiversx.com';
export const SUBSCRIPTION_PERIOD_IN_DAYS = 30;

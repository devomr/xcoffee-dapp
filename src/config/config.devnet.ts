import { EnvironmentsEnum } from 'types';

export * from './sharedConfig';

export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqrsse0535l7f0rtp7e8t560tws2g3y0aq7j4qa2cl30';
export const API_URL = 'https://localhost:3001';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const EXPLORER_URL = 'https://devnet-explorer.multiversx.com';
export const SUBSCRIPTION_PERIOD_IN_DAYS = 30;

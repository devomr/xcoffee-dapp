import { DonationTransaction } from 'types/donationTransaction.types';

export const transactions: DonationTransaction[] = [
  {
    id: '1',
    name: 'John',
    amount: 0.2,
    message: 'Great content',
    txHash: '8694ef056d1d919504cb029e8c27e287540d93d6910d2304d296429857e370b8',
    receiverAddress:
      'erd1mgvcl88gxetn7jls87jgpgwwjklesa8eynmhce6ejw950chkd6wslh6fw3'
  },
  {
    id: '2',
    name: 'Bob',
    amount: 1.25,
    message: 'I really like you',
    txHash: '8694ef056d1d919504cb029e8c27e287540d93d6910d2304d296429857e370b8',
    receiverAddress:
      'erd1mgvcl88gxetn7jls87jgpgwwjklesa8eynmhce6ejw950chkd6wslh6fw3'
  }
];

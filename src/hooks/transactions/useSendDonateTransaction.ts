import { useState } from 'react';
import {
  deleteTransactionToast,
  removeAllSignedTransactions,
  removeAllTransactionsToSign
} from '@multiversx/sdk-dapp/services/transactions/clearTransactions';
import { refreshAccount, sendTransactions } from 'helpers';
import { useTrackTransactionStatus } from 'hooks/sdkDappHooks';
import { SessionEnum } from 'localConstants';
import { getChainId } from 'utils/getChainId';
import { smartContract } from 'utils/smartContract';
import { Address, AddressValue, StringValue, U8Value } from '@multiversx/sdk-core/out';

export const useSendDonateTransaction = (type: SessionEnum) => {
  // Needed in order to differentiate widgets between each other
  // By default sdk-dapp takes the last sessionId available which will display on every widget the same transaction
  // this usually appears on page refreshes
  const [donateSessionId, setDonateSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const transactionStatus = useTrackTransactionStatus({
    transactionId: donateSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(donateSessionId ?? '');
  };

  const sendDonateTransactionFromAbi = async (creatorAddress: string, name: string, message: string, amount?: string) => {
    clearAllTransactions();

    const donateTransaction = smartContract.methodsExplicit
      .donate([new AddressValue(new Address(creatorAddress)), new StringValue(name), new StringValue(message)])
      .withValue(amount ?? '0')
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: donateTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Donate transaction',
        errorMessage: 'An error has occured during donation',
        successMessage: 'Donate transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setDonateSessionId(sessionId);
  };

  
  return {
    sendDonateTransactionFromAbi,
    transactionStatus
  };
};

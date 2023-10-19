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
import { U64Value } from '@multiversx/sdk-core/out';

export const useSendUnsubscribeTransaction = (type: SessionEnum) => {
  // Needed in order to differentiate widgets between each other
  // By default sdk-dapp takes the last sessionId available which will display on every widget the same transaction
  // this usually appears on page refreshes
  const [unsubscribeSessionId, setUnsubscribeSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const transactionStatus = useTrackTransactionStatus({
    transactionId: unsubscribeSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(unsubscribeSessionId ?? '');
  };

  const sendUnsubscribeTransactionFromAbi = async (subscription_id: number) => {
    clearAllTransactions();

    const unsubscribeTransaction = smartContract.methodsExplicit
      .cancel_subscription([new U64Value(subscription_id)])
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: unsubscribeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Unsubscribe transaction',
        errorMessage: 'An error has occured during unsubscribing',
        successMessage: 'Unsubscribe transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setUnsubscribeSessionId(sessionId);
  };

  return {
    sendUnsubscribeTransactionFromAbi,
    transactionStatus
  };
};

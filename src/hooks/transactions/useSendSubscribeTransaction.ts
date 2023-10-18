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
import {
  Address,
  AddressValue,
  StringValue,
  U64Value,
  U8Value
} from '@multiversx/sdk-core/out';

export const useSendSubscribeTransaction = (type: SessionEnum) => {
  // Needed in order to differentiate widgets between each other
  // By default sdk-dapp takes the last sessionId available which will display on every widget the same transaction
  // this usually appears on page refreshes
  const [subscribeSessionId, setSubscribeSessionId] = useState(
    sessionStorage.getItem(type)
  );

  const transactionStatus = useTrackTransactionStatus({
    transactionId: subscribeSessionId ?? '0'
  });

  const clearAllTransactions = () => {
    removeAllSignedTransactions();
    removeAllTransactionsToSign();
    deleteTransactionToast(subscribeSessionId ?? '');
  };

  const sendSubscribeTransactionFromAbi = async (
    creatorAddress: string,
    amount: string,
    duration: number
  ) => {
    clearAllTransactions();

    const subscribeTransaction = smartContract.methodsExplicit
      .create_user_subscription([
        new AddressValue(new Address(creatorAddress)),
        new U64Value(amount),
        new U64Value(duration)
      ])
      .withValue(amount ?? '0')
      .withGasLimit(60000000)
      .withChainID(getChainId())
      .buildTransaction()
      .toPlainObject();

    await refreshAccount();
    const { sessionId } = await sendTransactions({
      transactions: subscribeTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Subscribe transaction',
        errorMessage: 'An error has occured during donation',
        successMessage: 'Subscribe transaction successful'
      },
      redirectAfterSign: false
    });

    sessionStorage.setItem(type, sessionId);
    setSubscribeSessionId(sessionId);
  };

  return {
    sendSubscribeTransactionFromAbi,
    transactionStatus
  };
};

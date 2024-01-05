package csd.week5.transaction;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    List<Transaction> listTransactions();

    List<Transaction> listActiveTransactions();

    Transaction getTransaction(Long id);

    Transaction addTransaction(Transaction Transaction);

    Transaction confirmTransaction(Long id);

    Transaction createTransaction(TransactionRequest transactionRequest);

    boolean isTransactionExpired(Transaction transaction);

    void handleTimeoutTransactions();

    void checkTimeoutTransactions();

    Optional<Transaction> geTransaction(long id);

    void deleteTransaction(Long id);

}
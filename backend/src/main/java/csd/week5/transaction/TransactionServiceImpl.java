package csd.week5.transaction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import csd.week5.ticket.*;
import csd.week5.user.*;

@Service
public class TransactionServiceImpl implements TransactionService {

    private TransactionRepository Transactions;
    private UserRepository userRepository;
    private TicketRepository tickets;

    public TransactionServiceImpl(TransactionRepository Transactions, UserRepository userRepository,
            TicketRepository tickets) {
        this.Transactions = Transactions;
        this.userRepository = userRepository;
        this.tickets = tickets;
    }

    @Override
    public List<Transaction> listTransactions() {
        return Transactions.findAll();
    }

    @Override
    public List<Transaction> listActiveTransactions() {
        return Transactions.findAllByCompleted(false);
    }

    @Override
    public Transaction getTransaction(Long id) {
        return Transactions.findById(id).orElse(null);
    }
    
     @Override
    public Transaction addTransaction(Transaction Transaction) {
        // create transaction
        Transaction transaction = Transactions.save(Transaction);

        return transaction;
    }

    @Override
    public Transaction createTransaction(TransactionRequest transactionRequest) {
        double total_price = transactionRequest.getTotal_price(); // ensure this is a double
        Long user_id = transactionRequest.getUser_id(); // use Long instead of int
        User user = userRepository.findById(user_id) // findById expects a Long
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Transaction transaction = new Transaction(total_price, user);
        return Transactions.save(transaction);
    }

    // confirms that the transaction is completed and the seats selected are final
    // and paid for
    @Override
    public Transaction confirmTransaction(Long id) {
        return Transactions.findById(id).map(Transaction -> {
            Transaction.setCompleted(true);
            return Transactions.save(Transaction);
        }).orElse(null);
    }

    @Override
    public Optional<Transaction> geTransaction(long id){
        return Transactions.findById(id);
    }

    public boolean isTransactionExpired(Transaction transaction) {
        LocalDateTime localDateTime = LocalDateTime.now();
        LocalDateTime _5minsAfterTransaction = transaction.getLocalDateTime().plusMinutes(5);
        return localDateTime.isAfter(_5minsAfterTransaction);
    }

    public void handleTimeoutTransactions() {
        List<Transaction> transactions = listActiveTransactions();

        for (Transaction transaction : transactions) {
            if (isTransactionExpired(transaction)) {
                // Handle the expired transaction (e.g., cancel it or take appropriate action).
                deleteTransaction(transaction.getId());
            }
        }
    }

    @Scheduled(fixedRate = 2000) // Runs every minute
    public void checkTimeoutTransactions() {
        handleTimeoutTransactions();
    }

    @Override
    public void deleteTransaction(Long id) {
        Transaction transaction = Transactions.findById(id).orElse(null);
        // List<Ticket> ticketList = tickets.findAllTicketsByTransaction(transaction);
        List<Ticket> ticketList = tickets.findAllTicketsByTransactionId(transaction.getId());

        // revert availability and transaction_id attributes
        for (Ticket ticket : ticketList) {
            ticket.setAvailable(true);
            // change transaction to transaction_id if we changed the foreign key in
            // Ticket.java
            ticket.setTransaction(null);
            ;
        }

        Transactions.deleteById(id);
    }

}
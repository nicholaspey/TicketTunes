package csd.week5.transaction;

import java.util.List;
import java.util.Optional;

import csd.week5.user.User;

import javax.validation.Valid;

import csd.week5.automateEmail.EmailService;
import csd.week5.ticket.Ticket;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class TransactionController {

    private TransactionService TransactionService;
    private EmailService emailService;

    public TransactionController(TransactionService bs, EmailService emailService) {
        this.TransactionService = bs;
        this.emailService = emailService;
    }

    @GetMapping("/Transactions")
    public List<Transaction> getTransactions() {
        return TransactionService.listTransactions();
    }

    @GetMapping("/Transactions/{id}")
    public Transaction getTransaction(@PathVariable Long id) {
        Transaction Transaction = TransactionService.getTransaction(id);
        if (Transaction == null)
            throw new TransactionNotFoundException(id);
        return TransactionService.getTransaction(id);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/Transactions")
    public Transaction createTransaction(@Valid @RequestBody TransactionRequest TransactionRequest) {
        return TransactionService.createTransaction(TransactionRequest);
    }

    @PutMapping("Transactions/{id}")
    public Transaction completeTransaction(@PathVariable Long id) {
        Transaction transaction = TransactionService.confirmTransaction(id);
        if (transaction == null) {
            throw new TransactionNotFoundException(id);
        }

        return transaction;
    }

    @DeleteMapping("/Transactions/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        try {
            TransactionService.deleteTransaction(id);
        } catch (EmptyResultDataAccessException e) {
            throw new TransactionNotFoundException(id);
        }
    }

    @PutMapping("/successfulTransaction/{id}")
    public ResponseEntity<?> successfulTransaction(@PathVariable Long id) {
        // Retrieve the transaction from the service layer
        Optional<Transaction> transactionOpt = TransactionService.geTransaction(id);

        // Check if transaction exists and is not already completed
        if (!transactionOpt.isPresent()) {
            throw new TransactionNotFoundException(id);
        }

        Transaction transaction = transactionOpt.get();

        transaction.completed();
        // Prepare and send the email
        try {
            String username = transaction.getUser().getUsername();
            String email = transaction.getUser().getEmail();
            List<Ticket> tickets = transaction.getTicketList();
            emailService.sendPurchaseConfirmationEmail(email, id, username, tickets);
            // Mark the transaction as completed
             
        } catch (Exception e) {
            // Log the exception and return a server error response
            // Optionally, you can also reverse the transaction completion if email sending
            // fails
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send confirmation email");
        }

        // If everything goes well, return a success response
        return ResponseEntity.ok("Transaction completed and confirmation email sent");
    }

}
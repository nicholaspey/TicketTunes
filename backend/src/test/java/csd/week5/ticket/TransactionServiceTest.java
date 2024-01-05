package csd.week5.ticket;
import csd.week5.transaction.Transaction;
import csd.week5.transaction.TransactionRepository;
import csd.week5.transaction.TransactionServiceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @Mock
    private TransactionRepository transactions;
    @Mock
    private TicketRepository tickets;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @Test
    void addTransaction_NewTitle_ReturnSavedTransaction() {
        Transaction Transaction = new Transaction(0.0, null);

        when(transactions.save(any (Transaction.class))).thenReturn(Transaction);

        Transaction savedTransaction = transactionService.addTransaction(Transaction);

        assertNotNull(savedTransaction);
        verify(transactions).save(Transaction);
    }

    @Test
    void getTransaction_Found_ReturnTransaction() {
        Transaction Transaction = new Transaction(0.0, null);
        Long id = 1L;

        when(transactions.findById(id)).thenReturn(Optional.of(Transaction));

        Transaction getTransaction = transactionService.getTransaction(id);

        assertEquals(Transaction, getTransaction);
        verify(transactions).findById(id);
    }

    @Test
    void getTransaction_NotFound_ReturnNull() {
        Long id = 1L;

        when(transactions.findById(id)).thenReturn(Optional.empty());

        Transaction getTransaction = transactionService.getTransaction(id);

        assertNull(getTransaction);
        verify(transactions).findById(id);
    }

    @Test
    void confirmTransaction_Found_ReturnTransaction() {
        Transaction Transaction = new Transaction(0.0, null);
        Long id = 1L;
        when(transactions.findById(id)).thenReturn(Optional.of(Transaction));
        when(transactions.save(Transaction)).thenReturn(Transaction);
        Transaction getTransaction = transactionService.confirmTransaction(id);

        assertTrue(getTransaction.isCompleted());
        verify(transactions).findById(id);
        verify(transactions).save(Transaction);
    }

    @Test
    void confirmTransaction_NotFound_ReturnNull() {
        Long id = 1L;
        when(transactions.findById(id)).thenReturn(Optional.empty());
        Transaction getTransaction = transactionService.confirmTransaction(id);

        assertNull(getTransaction);
        verify(transactions).findById(id);
    }

    @Test
    void isTransactionExpired_NotExpired_ReturnFalse() {
        Transaction Transaction = new Transaction(0.0, null);
        LocalDateTime _5minsBeforeNow = LocalDateTime.now().minusMinutes(5);
        Transaction.setLocalDateTime(_5minsBeforeNow);

        boolean isExpired = transactionService.isTransactionExpired(Transaction);

        assertFalse(isExpired);
    }

    @Test
    void isTransactionExpired_Expired_ReturnTrue() {
        Transaction Transaction = new Transaction(0.0, null);
        LocalDateTime _6minsBeforeNow = LocalDateTime.now().minusMinutes(6);
        Transaction.setLocalDateTime(_6minsBeforeNow);

        boolean isExpired = transactionService.isTransactionExpired(Transaction);

        assertTrue(isExpired);
    }

    @Test
    void deleteTransaction_Found_TicketStatusChanged() {
        Ticket t1 = new Ticket("Ticket1", "123", "1ac23V", 100, false);
        Ticket t2 = new Ticket("Ticket2", "123", "1ac23V", 100, false);
        Transaction Transaction = new Transaction(0.0, null);
        Long id = 1L;
        t1.setTransaction(Transaction);
        t2.setTransaction(Transaction);
        List<Ticket> ticketList = new ArrayList<>();
        ticketList.add(t1);
        ticketList.add(t2);
        Transaction.setTicketList(ticketList);

        when(transactions.findById(id)).thenReturn(Optional.of(Transaction));
        when(tickets.findAllTicketsByTransactionId(Transaction.getId())).thenReturn(ticketList);

        transactionService.deleteTransaction(id);

        assertTrue(t1.getAvailable() && t2.getAvailable());
        assertNull(t1.getTransaction());
        assertNull(t2.getTransaction());
        verify(transactions).findById(id);
        verify(tickets).findAllTicketsByTransactionId(Transaction.getId());

    }
}
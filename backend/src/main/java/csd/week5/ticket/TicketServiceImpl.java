package csd.week5.ticket;

import java.util.List;
import org.springframework.stereotype.Service;
import csd.week5.transaction.*;

@Service
public class TicketServiceImpl implements TicketService {

    private TicketRepository tickets;
    private TransactionRepository transactionRepository;

    public TicketServiceImpl(TicketRepository tickets,TransactionRepository transactionRepository) {
        this.tickets = tickets;
        this.transactionRepository=transactionRepository;
    }

    @Override
    public List<Ticket> listTickets() {
        return tickets.findAll();
    }


    @Override
    public List<Ticket> listTicketsByTransaction_Id(Long transactionId) {
        return tickets.findAllTicketsByTransactionId(transactionId);
    }

    @Override
    public Ticket getTicket(Long id) {
        return tickets.findById(id).orElse(null);
    }

    @Override
    public Ticket addTicket(Ticket ticket) {
        return tickets.save(ticket);
    }

    @Override
    public Ticket updateTicket(Long id, Ticket newTicketInfo) {
        return tickets.findById(id).map(ticket -> {
            ticket.setSeat_number(newTicketInfo.getSeat_number());
            ticket.setUnit_price(newTicketInfo.getUnit_price());
            ticket.setTitle(newTicketInfo.getTitle());
            ticket.setTicket_number(newTicketInfo.getTicket_number());
            return tickets.save(ticket);
        }).orElse(null);

    }

    /**
     * Remove a book with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing a ticket will also remove all its associated reviews
     */
    @Override
    public void deleteTicket(Long id) {
        tickets.deleteById(id);
    }

    @Override
    public Ticket updateAvailabilityById(Long id, Boolean available, Long transactionId) {
        return tickets.findById(id).map(ticket -> {
            ticket.setAvailable(available);
            
            if (transactionId != null) {
                // Fetch the transaction from the database
                Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
                ticket.setTransaction(transaction); // Now we directly set the Transaction object
            } else {
                ticket.setTransaction(null);
            }
            
            return tickets.save(ticket);
        }).orElse(null);
    }

    @Override
    public List<Ticket> listTicketsByTransaction_Id(Transaction transaction) {
        throw new UnsupportedOperationException("Unimplemented method 'listTicketsByTransaction_Id'");
    }
}


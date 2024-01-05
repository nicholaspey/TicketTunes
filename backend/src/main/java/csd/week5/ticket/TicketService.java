package csd.week5.ticket;

import java.util.List;

import csd.week5.transaction.*;

public interface TicketService {
    List<Ticket> listTickets();

    // List<Ticket> listTicketsByTransaction_Id(Transaction transaction);

    Ticket getTicket(Long id);

    Ticket addTicket(Ticket ticket);

    Ticket updateTicket(Long id, Ticket newTicketInfo);

    Ticket updateAvailabilityById(Long id, Boolean available, Long transactionId);

    /**
     * Change method's signature: do not return a value for delete operation
     * 
     * @param id
     */
    void deleteTicket(Long id);
    // Ticket buyTicket(Long id, Long userID);

    List<Ticket> listTicketsByTransaction_Id(Long transactionId);
    List<Ticket> listTicketsByTransaction_Id(Transaction transaction);
}
package csd.week5.ticket;

import java.util.List;

import javax.validation.Valid;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class TicketController {
    private TicketService ticketService;

    public TicketController(TicketService bs) {
        this.ticketService = bs;
    }

    @GetMapping("/tickets")
    public List<Ticket> getTickets() {
        return ticketService.listTickets();
    }

    @GetMapping("/tickets/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicket(id);
        if (ticket == null)
            throw new TicketNotFoundException(id);
        return ticketService.getTicket(id);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/tickets")
    public Ticket addTicket(@Valid @RequestBody Ticket ticket) {
        return ticketService.addTicket(ticket);
    }

    @PutMapping("/tickets/{id}")
    public Ticket updateTicket(@PathVariable Long id, @Valid @RequestBody Ticket newTicketInfo) {
        Ticket ticket = ticketService.updateTicket(id, newTicketInfo);
        if (ticket == null)
            throw new TicketNotFoundException(id);

        return ticket;
    }

    @PutMapping("/tickets/updateAvailability/{id}")
    public Ticket updateAvailabilityById(@PathVariable Long id, @RequestBody TicketRequest TicketRequest) {
        // Call the updated service method with id, available, and transactionId from
        // the request
        return ticketService.updateAvailabilityById(id, TicketRequest.getAvailable(),
                TicketRequest.getTransactionId());
    }

    @DeleteMapping("/tickets/{id}")
    public void deleteTicket(@PathVariable Long id) {
        try {
            ticketService.deleteTicket(id);
        } catch (EmptyResultDataAccessException e) {
            throw new TicketNotFoundException(id);
        }
    }

    @GetMapping("/getTickets/{transactionId}") 
    public List<Ticket> getTickets(@PathVariable long transactionId) {
        return ticketService.listTicketsByTransaction_Id(transactionId);
    }
    
}
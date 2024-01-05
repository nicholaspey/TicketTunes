package csd.week5.session;

import java.util.Date;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import csd.week5.user.*;
import csd.week5.transaction.*;

@Service
public class SessionServiceImpl implements SessionService {

    private SessionRepository sessions;
    private TransactionRepository transaction;

    public SessionServiceImpl(SessionRepository sessions, TransactionRepository transaction) {
        this.sessions = sessions;
        this.transaction = transaction;
    }

    @Override
    public List<Session> listSessions() {
        return sessions.findAll();
    }

    @Override
    public Session getSession(Long id) {
        return sessions.findById(id).orElse(null);
    }

    // @Override
    // public Session addSession(Session session) {
    //     return sessions.save(session);
    // }

    @Override
    @Transactional
    public Session startSession(Transaction transaction, long duration) {
        Session session = new Session();
        session.setStartTime(new Date());
        session.setDuration(duration);
        session.setTransaction(transaction);
        return sessions.save(session);
    }

    @Override
    public boolean isSessionValid(Long id){
        Session session = sessions.findById(id).orElse(null);
        if (session != null) {
            Date currentTime = new Date();
            Date sessionStartTime = session.getStartTime();
            long elapsedTime = currentTime.getTime() - sessionStartTime.getTime();
            return elapsedTime <= session.getDuration();
        }
        return false;
    }



    // @Override
    // public Ticket updateTicket(Long id, Ticket newTicketInfo) {
    //     return tickets.findById(id).map(ticket -> {
    //         ticket.setTitle(newTicketInfo.getTitle());
    //         return tickets.save(ticket);
    //     }).orElse(null);

    // }

    /**
     * Remove a book with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing a book will also remove all its associated reviews
     */
    @Override
    public void endSession(Long id) {
        sessions.deleteById(id);
    }

    // @Override
    // public Ticket updateAvailabilityById(Long id, Boolean available) {
    //     return tickets.findById(id).map(ticket -> {
    //         ticket.setAvailable(available);
    //         return tickets.save(ticket);
    //     }).orElse(null);
    // }

    // @Override
    // public Ticket buyTicket(Long id, Long userID) {
    //     Ticket ticket = getTicket(id);
    //     users.findById(userID).map(user -> {
    //         ticket.setUser(user);
    //         ticket.setAvailability(false);
    //         return tickets.save(ticket);
    //     });
    //     return ticket;
    // }
}
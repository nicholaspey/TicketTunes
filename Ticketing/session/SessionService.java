package csd.week5.session;

import java.util.List;

public interface SessionService {
    List<Session> listSessions();

    Session getSession(Long id);

    Session startSession(Transaction transaction, long duration);

    boolean isSessionValid(Long id);

    // void startSession(Transaction transaction, long duration);

    // Session updateSession(Long id, Session session);

    // Session updateAvailabilityById(Long id, Boolean available);

    /**
     * Change method's signature: do not return a value for delete operation
     * 
     * @param id
     */
    void endSession(Long id);

}
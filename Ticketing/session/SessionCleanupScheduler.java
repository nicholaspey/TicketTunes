package csd.week5.session;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import csd.week5.session.Session;
import csd.week5.session.SessionRepository;
import csd.week5.session.SessionService;
import csd.week5.session.SessionServiceImpl;

@Component
public class SessionCleanupScheduler {
    private SessionRepository sessions;

    // public SessionCleanupScheduler(SessionServiceImpl sessionServiceImpl) {
    //     this.sessionServiceImpl = sessionServiceImpl;
    // }
    
    @Autowired
    public SessionCleanupScheduler(SessionRepository sessionRepository) {
        this.SessionRepository = sessionRepository;
    }

    @Scheduled(fixedRate = 10000)
    public void cleanupExpiredSessions() {
        // Iterate through sessions and end expired ones.
        List<Session> activeSessions = sessions.listSessions();

        for (Session session : activeSessions) {
            Long sessionId = session.getId();
            if(!sessions.isSessionValid(sessionId)) {
                sessions.endSession(sessionId);
                // TODO: add here other cleanups eg delete transaction, revert ticket availability bool
            }
        }
    }
}
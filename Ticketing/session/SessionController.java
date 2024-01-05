package csd.week5.session;

import java.util.List;

import javax.validation.Valid;


import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.ResponseStatus;
// import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class SessionController {
    private SessionService SessionService;

    public SessionController(SessionService bs){
        this.SessionService = bs;
    }

    @GetMapping("/Sessions")
    public List<Session> getSessions(){
        return SessionService.listSessions();
    }

    @GetMapping("/Sessions/{id}")
    public Session getSession(@PathVariable Long id){
        Session Session = SessionService.getSession(id);
        if(Session == null) throw new SessionNotFoundException(id);
        return SessionService.getSession(id);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/Session")
    public Session addSession(@Valid @RequestBody Session Session) {
        return SessionService.addSession(Session);
    }

    @PutMapping("/Session/{id}")
    public Session updateSession(@PathVariable Long id, @Valid @RequestBody Session newSessionInfo){
        Session Session = SessionService.updateSession(id, newSessionInfo);
        if(Session == null) throw new SessionNotFoundException(id);
        
        return Session;
    }

    
    @DeleteMapping("/Session/{id}")
    public void deleteSession(@PathVariable Long id){
        try{
            SessionService.deleteSession(id);
         }catch(EmptyResultDataAccessException e) {
            throw new SessionNotFoundException(id);
         }
    }

}
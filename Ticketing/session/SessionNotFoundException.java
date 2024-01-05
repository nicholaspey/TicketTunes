package csd.week5.session;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SessionNotFoundException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public SessionNotFoundException(Long id) {
        super("Could not find session " + id);
    }
    
}
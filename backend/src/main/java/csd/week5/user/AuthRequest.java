package csd.week5.user;

import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor; 
  
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest { 
  
    private String username; 
    private String password; 
  
}

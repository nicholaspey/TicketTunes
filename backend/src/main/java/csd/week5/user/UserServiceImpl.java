package csd.week5.user; 
 
import java.util.List; 
import java.util.Optional; 

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.stereotype.Service;

@Service 
public class UserServiceImpl implements UserService { 
 
    private UserRepository userRepository; 
    private BCryptPasswordEncoder encoder; 
 
    public UserServiceImpl(UserRepository userRepository,BCryptPasswordEncoder encoder) { 
        this.userRepository = userRepository; 
        this.encoder = encoder; 
    } 
 
    @Override 
    public List<User> listUsers() { 
        return userRepository.findAll(); 
    } 
 
    @Override 
    public User addUser(User newUser) { 
        // Create a new user using the values from newUserInfo 
        String username = newUser.getUsername(); 
        String password = encoder.encode(newUser.getPassword()); 
        String email = newUser.getEmail(); 
        String address = newUser.getAddress(); 
        String phone_num = newUser.getPhone_num(); 
      
        User user = new User(username, password, email, address, phone_num); 
 
        // Save the new user to the repository 
        return userRepository.save(user); 
    } 
 
    @Override 
    public User updateUsers(Long id, User newUserInfo) { 
        return userRepository.findById(id).map(existingUser -> { 
            // Update the user fields directly with the values from newUserInfo 
            existingUser.setUsername(newUserInfo.getUsername()); 
            existingUser.setPassword(newUserInfo.getPassword()); 
            existingUser.setEmail(newUserInfo.getEmail()); 
            existingUser.setAddress(newUserInfo.getAddress()); 
            existingUser.setPhone_num(newUserInfo.getPhone_num()); 
            return userRepository.save(existingUser); 
        }).orElse(null); 
    } 
 
    /** 
     * Remove a user with the given id 
     * Spring Data JPA does not return a value for delete operation 
     */ 
    @Override 
    public void deleteUser(Long id) { 
        userRepository.deleteById(id); 
    } 
 
    @Override 
    public Optional<User> getUser(Long id) { 
        return userRepository.findById(id); 
    } 
 
    @Override 
    public User registerNewUserAccount(User newUser) { 
 
        // Create a new user from the DTO 
        User user = new User(); 
        user.setUsername(newUser.getUsername()); 
        user.setPassword(encoder.encode(newUser.getPassword())); // Encrypt the password 
        user.setEmail(newUser.getEmail()); 
        user.setAddress(newUser.getAddress()); 
        user.setPhone_num(newUser.getPhone_num()); 
        user.setAuthorities("ROLE_USER"); // Set the default role 
 
        // Save the new user to the database 
        return userRepository.save(user); 
    } 
 
    public boolean emailExists(String email) { 
        return userRepository.findByEmail(email).isPresent(); 
    } 

    public boolean usernameExists(String username){
        return userRepository.findByUsername(username).isPresent();
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }
 
   @Override 
    public User authenticate(String username, String password) { 
 
        if(userRepository.findByUsername(username).isPresent()){ 
            User user = userRepository.findByUsername(username).get(); 
            if(encoder.matches(password, user.getPassword())) {
                return user;
            }
        } 
 
        return null; 
    } 
}

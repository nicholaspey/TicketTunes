package csd.week5.user;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> listUsers();

    Optional<User> getUser(Long id);

    User addUser(User user);

    User updateUsers(Long id, User user);

    User getUserByUsername(String username);

    void deleteUser(Long id);
    boolean emailExists(String email);
    boolean usernameExists (String username);
    User registerNewUserAccount(User newUser);
    User authenticate(String email, String password);
}
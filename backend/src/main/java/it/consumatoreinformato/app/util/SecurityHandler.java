package it.consumatoreinformato.app.util;

import it.consumatoreinformato.app.exception.NotAuthenticatedException;
import it.consumatoreinformato.app.exception.UserNotFoundException;
import it.consumatoreinformato.app.model.entities.User;
import it.consumatoreinformato.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;
import java.util.Set;

@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SecurityHandler {

    private final UserRepository userRepository;

    @Autowired
    public SecurityHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getPrincipalAsUser()
            throws UserNotFoundException, NotAuthenticatedException {
        String username = getPrincipalUsername();
        Optional<User> oUser = userRepository.findByEmail(username);
        return oUser.orElseThrow(() -> new UserNotFoundException(username));
    }

    private UserDetails getPrincipal() throws NotAuthenticatedException {
        SecurityContext x = SecurityContextHolder.getContext();
        Authentication y = SecurityContextHolder.getContext().getAuthentication();
        if (x == null || y == null)
            throw new NotAuthenticatedException();

        return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Set<String> getPrincipalRoles() throws UserNotFoundException, NotAuthenticatedException {
        return getPrincipalAsUser().getRoles();
    }

    private String getPrincipalUsername()
            throws NotAuthenticatedException {
        return getPrincipal().getUsername();
    }
}

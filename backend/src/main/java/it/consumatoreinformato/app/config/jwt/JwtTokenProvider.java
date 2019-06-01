package it.consumatoreinformato.app.config.jwt;

import it.consumatoreinformato.app.exception.InvalidJwtAuthenticationException;
import it.consumatoreinformato.app.exception.InvalidJwtRegenerationTokenException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private UserDetailsService userDetailsService;

    @Value("${security.jwt.token.secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expire-length}")
    private long baseTokenValidity;
    @Value("${security.jwt.token.regeneration.expire-length}")
    private long regenerationTokenValidity;

    @Autowired
    public JwtTokenProvider(@Qualifier("customUserDetailsService") UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String username, Iterable<String> roles) {
        return generateToken(username, roles, baseTokenValidity);
    }

    public String createRegenerationToken(String username, Iterable<String> roles) {
        return generateToken(username, roles, regenerationTokenValidity);
    }

    public String getUsernameByRegenerationToken(String regenerationToken) throws InvalidJwtRegenerationTokenException {
        try {
            validateToken(regenerationToken);
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(regenerationToken).getBody().getSubject();
        } catch (Exception e){
            throw new InvalidJwtRegenerationTokenException();
        }

    }

    private String getUsernameByToken(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    private String generateToken(String username, Iterable<String> roles, Long validityInMilliseconds) {
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("roles", roles);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey)
            .compact();
    }

    Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUsernameByToken(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    boolean validateToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());

        } catch (JwtException | IllegalArgumentException e) {
//            FIXME manage this exception properly
            throw new InvalidJwtAuthenticationException();
        }
    }

}
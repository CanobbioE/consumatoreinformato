package it.consumatoreinformato.app.model.entities;

import it.consumatoreinformato.app.config.ModelMapperHelper;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.google.common.collect.Sets;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "users",
        indexes = {@Index(name = "user_email_idx", columnList = "email")})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "hash", nullable = false)
    private String hash;

    @Column(name ="name")
    private String name;

    @Column(name="surname")
    private String surname;

    @Column(name="birthday")
    private LocalDate birthday;

    @Column(name="birthplace")
    private String birthplace;

    @Column(name = "codeice_fiscale")
    private String codiceFiscale;

    @Column(name = "home_address")
    private String homeAddress;

    @Column(name = "telephone_number")
    private String telephoneNumber;

    @OneToMany(mappedBy = "payer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Payment> payments;


    @OneToMany(mappedBy = "uploader", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Upload> uploads;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private Set<String> roles;
//    private List<String> roles;


    @PrePersist
    protected void onCreate() {
        if (roles == null){
            roles = Sets.newHashSet("ROLE_USER");
//            roles = Lists.newArrayList("ROLE_USER");
        }
    }

    public static User fromDto(Object dto) {
        return ModelMapperHelper.mapToNew(dto, User.class);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return hash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

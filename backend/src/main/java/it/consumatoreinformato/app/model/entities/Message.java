package it.consumatoreinformato.app.model.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    @JsonBackReference
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    @JsonBackReference
    private User receiver;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "content", columnDefinition="TEXT")
    private String content;

    @Column(name = "read")
    private Boolean read;
}

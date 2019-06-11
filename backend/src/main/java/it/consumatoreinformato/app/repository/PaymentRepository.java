package it.consumatoreinformato.app.repository;

import it.consumatoreinformato.app.model.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findFirstByPayerIdOrderByDateDesc(Long payerID);
}


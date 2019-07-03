package it.consumatoreinformato.app.repository;

import it.consumatoreinformato.app.model.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
   List<Message> findAllByReceiverIdAndRead(Long id, Boolean isRead);
   List<Message> findAllByReceiverId(Long id);
   Optional<Message> findByReceiverIdAndSenderIdAndDateAndRead(Long receiver, Long sender, LocalDate date, Boolean isRead);
}


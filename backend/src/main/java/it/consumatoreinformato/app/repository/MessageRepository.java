package it.consumatoreinformato.app.repository;

import it.consumatoreinformato.app.model.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
   List<Message> findAllByReceiverIdAndRead(Long id, Boolean isRead);
   List<Message> findAllByReceiverIdOrSenderIdOrderByDateTime(Long receiver, Long sender);
   List<Message> findByReceiverIdAndSenderIdAndDateTimeBeforeAndRead(Long receiver, Long sender, LocalDateTime date, Boolean isRead);
}


package com.pavanrajputz.portfolio.contact.repository;

import com.pavanrajputz.portfolio.contact.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage,Long> {
    List<ContactMessage> findAllByIsDeletedIsFalse();
    Optional<ContactMessage> findByIdAndIsDeletedIsFalse(Long id);
}

package com.pavanrajputz.portfolio.contact.service;

import com.pavanrajputz.portfolio.contact.dto.ContactMessageRequest;
import com.pavanrajputz.portfolio.contact.dto.ContactMessageResponse;
import com.pavanrajputz.portfolio.contact.entity.ContactMessage;
import com.pavanrajputz.portfolio.contact.repository.ContactMessageRepository;
import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactMessageService {
    private final ContactMessageRepository repo;

    public ContactMessageResponse createMessage(
            ContactMessageRequest request
    ) {

        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();

        ContactMessage saved = repo.save(message);

        return mapToResponse(saved);
    }

    public List<ContactMessageResponse> getAllMessages() {

        return repo.findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ContactMessageResponse getMessageById(Long id) {

        ContactMessage message = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Contact message not found with id " + id
                        )
                );

        return mapToResponse(message);
    }

    public ContactMessageResponse markAsRead(Long id) {

        ContactMessage message = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Contact message not found with id " + id
                        )
                );

        message.setIsRead(true);

        ContactMessage updated =
                repo.save(message);

        return mapToResponse(updated);
    }

    public void deleteMessage(Long id) {

        ContactMessage message = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "Contact message not found with id " + id
                        )
                );

        message.setIsDeleted(true);

        repo.save(message);
    }

    private ContactMessageResponse mapToResponse(
            ContactMessage message
    ) {

        return ContactMessageResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .subject(message.getSubject())
                .message(message.getMessage())
                .isRead(message.getIsRead())
                .createdAt(message.getCreatedAt())
                .build();
    }

}

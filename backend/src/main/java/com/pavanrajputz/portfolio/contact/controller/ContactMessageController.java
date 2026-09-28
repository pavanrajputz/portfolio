package com.pavanrajputz.portfolio.contact.controller;

import com.pavanrajputz.portfolio.contact.dto.ContactMessageRequest;
import com.pavanrajputz.portfolio.contact.dto.ContactMessageResponse;
import com.pavanrajputz.portfolio.contact.service.ContactMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContactMessageController {

    private final ContactMessageService service;

    @PostMapping("/contact")
    public ResponseEntity<ContactMessageResponse> createMessage(
            @Valid @RequestBody ContactMessageRequest request
    ) {

        ContactMessageResponse response =
                service.createMessage(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/admin/messages")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactMessageResponse>> getAllMessages() {

        return ResponseEntity
                .ok(
                        service.getAllMessages()
                );
    }

    @GetMapping("/admin/messages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageResponse> getMessageById(
            @PathVariable Long id
    ) {

        return ResponseEntity
                .ok(
                        service.getMessageById(id)
                );
    }

    @PatchMapping("/admin/messages/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ContactMessageResponse> markAsRead(
            @PathVariable Long id
    ) {

        return ResponseEntity
                .ok(
                        service.markAsRead(id)
                );
    }

    @DeleteMapping("/admin/messages/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long id
    ) {

        service.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }

}

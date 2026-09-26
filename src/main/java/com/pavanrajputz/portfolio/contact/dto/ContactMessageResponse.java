package com.pavanrajputz.portfolio.contact.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessageResponse {

    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private Boolean isRead;
    private LocalDateTime createdAt;
}

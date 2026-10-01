package com.pavanrajputz.portfolio.certificate.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificateResponse {

    private Long id;
    private String title;
    private String issuer;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String description;
    private String certificateImageUrl;
    private String credentialId;
    private String credentialUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.pavanrajputz.portfolio.certificate.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificateRequest {

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 200, message = "Title cannot exceed 200 characters")
    private String title;

    @NotBlank(message = "Issuer cannot be blank")
    @Size(max = 200, message = "Issuer cannot exceed 200 characters")
    private String issuer;

    @NotNull(message = "Issue date is required")
    private LocalDate issueDate;

    private LocalDate expiryDate;

    @Size(max = 200, message = "Credential ID cannot exceed 200 characters")
    private String credentialId;

    @Size(max = 500, message = "Credential URL cannot exceed 500 characters")
    private String credentialUrl;

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @Size(max = 500, message = "Certificate image URL cannot exceed 500 characters")
    private String certificateImageUrl;

}

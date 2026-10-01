package com.pavanrajputz.portfolio.certificate.service;

import com.pavanrajputz.portfolio.certificate.dto.CertificateRequest;
import com.pavanrajputz.portfolio.certificate.dto.CertificateResponse;
import com.pavanrajputz.portfolio.certificate.entity.Certificate;
import com.pavanrajputz.portfolio.certificate.repository.CertificateRepository;
import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificateService {

    private final CertificateRepository repo;

    public CertificateResponse createCertificate(
            CertificateRequest request
    ){

        validateDates(request);
        Certificate crt = Certificate.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .issuer(request.getIssuer())
                .issueDate(request.getIssueDate())
                .credentialId(request.getCredentialId())
                .credentialUrl(request.getCredentialUrl())
                .certificateImageUrl(request.getCertificateImageUrl())
                .expiryDate(request.getExpiryDate())
                .build();

        Certificate saved = repo.save(crt);

        return mapToResponse(saved);
    }

    public List<CertificateResponse> getAllCertificates(){
        List<Certificate> crt = repo.findAllByIsDeletedIsFalse();
        return crt.stream()
                .map(this::mapToResponse)
                .toList();

    }

    public CertificateResponse getCertificateById(Long id){
        Certificate crt = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No certificate with id " + id + " was found"
                        )
                );

        return mapToResponse(crt);
    }

    public CertificateResponse updateCertificate(
            Long id,
            CertificateRequest request
    ){

        validateDates(request);
        Certificate crt = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No certificate with id " + id + " was found"
                        ));

        crt.setTitle(request.getTitle());
        crt.setDescription(request.getDescription());
        crt.setIssuer(request.getIssuer());
        crt.setIssueDate(request.getIssueDate());
        crt.setCredentialId(request.getCredentialId());
        crt.setCredentialUrl(request.getCredentialUrl());
        crt.setCertificateImageUrl(request.getCertificateImageUrl());
        crt.setExpiryDate(request.getExpiryDate());


        Certificate saved = repo.save(crt);

        return mapToResponse(saved);
    }

    public void deleteCertificateById(Long id){
        Certificate crt = repo.findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound("No certificate with id " + id)
                );

        crt.setIsDeleted(true);
    }

    private void validateDates(CertificateRequest request) {

        if (request.getExpiryDate() != null
                && request.getExpiryDate()
                .isBefore(request.getIssueDate())) {

            throw new IllegalArgumentException(
                    "Expiry date cannot be before issue date"
            );
        }
    }

    private CertificateResponse mapToResponse(Certificate crt){
        CertificateResponse response = CertificateResponse
                .builder()
                .id(crt.getId())
                .title(crt.getTitle())
                .description(crt.getDescription())
                .issuer(crt.getIssuer())
                .issueDate(crt.getIssueDate())
                .expiryDate(crt.getExpiryDate())
                .credentialId(crt.getCredentialId())
                .credentialUrl(crt.getCredentialUrl())
                .certificateImageUrl(crt.getCertificateImageUrl())
                .createdAt(crt.getCreatedAt())
                .updatedAt(crt.getUpdatedAt())
                .build();

        return response;
    }
}

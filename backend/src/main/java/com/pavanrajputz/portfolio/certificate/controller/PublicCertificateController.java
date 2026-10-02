package com.pavanrajputz.portfolio.certificate.controller;

import com.pavanrajputz.portfolio.certificate.dto.CertificateResponse;
import com.pavanrajputz.portfolio.certificate.service.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@RequiredArgsConstructor
public class PublicCertificateController {

    private final CertificateService service;

    @GetMapping
    public ResponseEntity<List<CertificateResponse>> getAllCertificates() {
        return ResponseEntity.ok(
                service.getAllCertificates()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificateResponse> getCertificateById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                service.getCertificateById(id)
        );
    }
}

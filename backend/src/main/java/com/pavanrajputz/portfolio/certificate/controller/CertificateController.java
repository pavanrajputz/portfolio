package com.pavanrajputz.portfolio.certificate.controller;

import com.pavanrajputz.portfolio.certificate.dto.CertificateRequest;
import com.pavanrajputz.portfolio.certificate.dto.CertificateResponse;
import com.pavanrajputz.portfolio.certificate.service.CertificateService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/admin/certificates")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class CertificateController {

    private final CertificateService service;

    @PostMapping
    public ResponseEntity<CertificateResponse> createCertificate(
            @Valid @RequestBody CertificateRequest request
            ){
        CertificateResponse response = service.createCertificate(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<CertificateResponse>> getAllCertificates(){
        return ResponseEntity
                .ok(
                        service.getAllCertificates()
                );
    }

    @GetMapping("{id}")
    public ResponseEntity<CertificateResponse> getCertificate(
            @PathVariable Long id
    ){
        return ResponseEntity
                .ok(
                        service.getCertificateById(id)
                );
    }

    @PutMapping("{id}")
    public ResponseEntity<CertificateResponse> updateCertificate(
            @PathVariable Long id,
            @Valid @RequestBody CertificateRequest request
    ){
        return ResponseEntity
                .ok(
                        service.updateCertificate(id, request)
                );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteCertificate(
            @PathVariable Long id
    ){

        service.deleteCertificateById(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}

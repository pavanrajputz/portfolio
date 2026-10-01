package com.pavanrajputz.portfolio.certificate.repository;

import com.pavanrajputz.portfolio.certificate.entity.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    List<Certificate> findAllByIsDeletedIsFalse();

    Optional<Certificate> findByIdAndIsDeletedIsFalse(Long id);
}

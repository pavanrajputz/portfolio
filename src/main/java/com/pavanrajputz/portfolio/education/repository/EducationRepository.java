package com.pavanrajputz.portfolio.education.repository;

import com.pavanrajputz.portfolio.education.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    List<Education> findAllByIsDeletedIsFalse();

    Optional<Education> findByIdAndIsDeletedIsFalse(Long id);
}

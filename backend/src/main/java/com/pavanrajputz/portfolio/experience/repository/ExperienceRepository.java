package com.pavanrajputz.portfolio.experience.repository;

import com.pavanrajputz.portfolio.experience.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findAllByIsDeletedIsFalse();

    Optional<Experience> findByIdAndIsDeletedIsFalse(Long id);
}

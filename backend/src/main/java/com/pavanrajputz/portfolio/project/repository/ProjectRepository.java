package com.pavanrajputz.portfolio.project.repository;

import com.pavanrajputz.portfolio.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findAllByIsDeletedIsFalse();

    Optional<Project> findByIdAndIsDeletedIsFalse(Long id);
}

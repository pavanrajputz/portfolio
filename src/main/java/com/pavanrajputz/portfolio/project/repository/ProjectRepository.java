package com.pavanrajputz.portfolio.project.repository;

import com.pavanrajputz.portfolio.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {
}

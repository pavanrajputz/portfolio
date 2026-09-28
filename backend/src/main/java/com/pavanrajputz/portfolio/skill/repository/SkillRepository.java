package com.pavanrajputz.portfolio.skill.repository;

import com.pavanrajputz.portfolio.skill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByIsDeletedIsFalse();
    Optional<Skill> findByIdAndIsDeletedIsFalse(Long id);
}

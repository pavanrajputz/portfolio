package com.pavanrajputz.portfolio.social.repository;

import com.pavanrajputz.portfolio.social.entity.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {
    List<SocialLink> findAllByIsDeletedIsFalse();

    Optional<SocialLink> findByIdAndIsDeletedIsFalse(Long id);
}

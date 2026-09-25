package com.pavanrajputz.portfolio.profile.repository;

import com.pavanrajputz.portfolio.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}

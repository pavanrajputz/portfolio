package com.pavanrajputz.portfolio.setting.repository;

import com.pavanrajputz.portfolio.setting.entity.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {

    List<Setting> findAllByIsDeletedIsFalse();

    Optional<Setting> findByIdAndIsDeletedIsFalse(Long id);

    Optional<Setting> findBySettingKeyAndIsDeletedIsFalse(
            String settingKey
    );

    List<Setting> findAllByIsPublicIsTrueAndIsDeletedIsFalse();
}
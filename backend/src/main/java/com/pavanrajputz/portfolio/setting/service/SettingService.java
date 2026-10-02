package com.pavanrajputz.portfolio.setting.service;

import com.pavanrajputz.portfolio.exception.DuplicateResource;
import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import com.pavanrajputz.portfolio.setting.dto.SettingRequest;
import com.pavanrajputz.portfolio.setting.dto.SettingResponse;
import com.pavanrajputz.portfolio.setting.entity.Setting;
import com.pavanrajputz.portfolio.setting.repository.SettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SettingService {

    private final SettingRepository settingRepository;

    public SettingResponse createSetting(SettingRequest request){
        if (settingRepository
                .findBySettingKeyAndIsDeletedIsFalse(request.getSettingKey())
                .isPresent()) {

            throw new DuplicateResource(
                    "Setting already exists for key: "
                            + request.getSettingKey()
            );
        }

        Setting setting = Setting
                .builder()
                .settingKey(request.getSettingKey())
                .settingValue(request.getSettingValue())
                .type(request.getType())
                .description(request.getDescription())
                .isPublic(
                        request.getIsPublic() == null
                                || request.getIsPublic()
                )
                .build();

        Setting savedSetting = settingRepository.save(setting);

        return mapToResponse(savedSetting);
    }

    public List<SettingResponse> getAllSettings() {

        return settingRepository
                .findAllByIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SettingResponse getSettingById(Long id) {

        Setting setting = settingRepository
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No setting found for id: " + id
                        )
                );

        return mapToResponse(setting);
    }

    public SettingResponse getSettingByKey(String key) {

        Setting setting = settingRepository
                .findBySettingKeyAndIsDeletedIsFalse(key)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No setting found for key: " + key
                        )
                );

        return mapToResponse(setting);
    }

    public List<SettingResponse> getPublicSettings() {

        return settingRepository
                .findAllByIsPublicIsTrueAndIsDeletedIsFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SettingResponse updateSetting(
            Long id,
            SettingRequest request
    ){
        Setting setting = settingRepository
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No setting found for id: " + id
                        )
                );

        settingRepository
                .findBySettingKeyAndIsDeletedIsFalse(
                        request.getSettingKey()
                )
                .ifPresent(existingSetting -> {

                    if (!existingSetting.getId().equals(id)) {
                        throw new DuplicateResource(
                                "Setting already exists for key: "
                                        + request.getSettingKey()
                        );
                    }
                });

        setting.setSettingKey(request.getSettingKey());
        setting.setSettingValue(request.getSettingValue());
        setting.setType(request.getType());
        setting.setDescription(request.getDescription());

        if (request.getIsPublic() != null) {
            setting.setIsPublic(request.getIsPublic());
        }

        Setting updatedSetting =
                settingRepository.save(setting);

        return mapToResponse(updatedSetting);
    }

    public void deleteSetting(Long id) {

        Setting setting = settingRepository
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No setting found for id: " + id
                        )
                );

        setting.setIsDeleted(true);

        settingRepository.save(setting);
    }


    private SettingResponse mapToResponse(Setting setting) {

        return SettingResponse
                .builder()
                .id(setting.getId())
                .settingKey(setting.getSettingKey())
                .settingValue(setting.getSettingValue())
                .type(setting.getType())
                .description(setting.getDescription())
                .isPublic(setting.getIsPublic())
                .createdAt(setting.getCreatedAt())
                .updatedAt(setting.getUpdatedAt())
                .build();
    }
}

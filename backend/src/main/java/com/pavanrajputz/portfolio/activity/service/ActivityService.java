package com.pavanrajputz.portfolio.activity.service;

import com.pavanrajputz.portfolio.activity.dto.ActivityRequest;
import com.pavanrajputz.portfolio.activity.dto.ActivityResponse;
import com.pavanrajputz.portfolio.activity.entity.Activity;
import com.pavanrajputz.portfolio.activity.repository.ActivityRepository;
import com.pavanrajputz.portfolio.exception.ResourceNotFound;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository repo;

    public ActivityResponse createActivity(ActivityRequest request){

        Activity act = Activity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .activityDate(request.getActivityDate())
                .type(request.getType())
                .imageUrl(request.getImageUrl())
                .externalUrl(request.getExternalUrl())
                .build();

        Activity response = repo.save(act);

        return mapToResponse(response);
    }

    public List<ActivityResponse> getAllActivities(){
        return repo.findAllByIsDeletedIsFalseOrderByActivityDateDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ActivityResponse getActivityById(Long id){
        Activity activity = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No activity found for id: " + id
                        )
                );

        return mapToResponse(activity);
    }

    public ActivityResponse updateActivity(
            Long id,
            ActivityRequest request
    ){
        Activity activity = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No activity found for id: " + id
                        )
                );

        activity.setTitle(request.getTitle());
        activity.setDescription(request.getDescription());
        activity.setActivityDate(request.getActivityDate());
        activity.setType(request.getType());
        activity.setImageUrl(request.getImageUrl());
        activity.setExternalUrl(request.getExternalUrl());

        Activity updatedActivity =
                repo.save(activity);

        return mapToResponse(updatedActivity);
    }

    public void deleteActivity(Long id) {

        Activity activity = repo
                .findByIdAndIsDeletedIsFalse(id)
                .orElseThrow(() ->
                        new ResourceNotFound(
                                "No activity found for id: " + id
                        )
                );

        activity.setIsDeleted(true);

        repo.save(activity);
    }

    private ActivityResponse mapToResponse(Activity activity) {

        return ActivityResponse
                .builder()
                .id(activity.getId())
                .title(activity.getTitle())
                .description(activity.getDescription())
                .activityDate(activity.getActivityDate())
                .type(activity.getType())
                .imageUrl(activity.getImageUrl())
                .externalUrl(activity.getExternalUrl())
                .createdAt(activity.getCreatedAt())
                .updatedAt(activity.getUpdatedAt())
                .build();
    }
}

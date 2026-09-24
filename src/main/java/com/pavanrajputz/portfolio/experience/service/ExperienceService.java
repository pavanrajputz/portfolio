package com.pavanrajputz.portfolio.experience.service;

import com.pavanrajputz.portfolio.experience.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExperienceService {

    private final ExperienceRepository repo;

}

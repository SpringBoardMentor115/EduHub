package com.example.myapp.service;

import com.example.myapp.model.Progress;
import com.example.myapp.repository.ProgressRepository;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public Progress getProgressByEnrollmentId(Long enrollmentId) {
        return progressRepository.findByEnrollmentEnrollmentId(enrollmentId);
    }
}

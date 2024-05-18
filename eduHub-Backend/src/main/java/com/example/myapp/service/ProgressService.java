package com.example.myapp.service;

import com.example.myapp.model.Progress;
import com.example.myapp.repository.ProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public Progress getProgressByEnrollmentId(Long enrollmentId) {
        return progressRepository.findByEnrollmentEnrollmentId(enrollmentId);
    }

    @Transactional
    public Progress updateProgressPercentage(Long enrollmentId, int percentage) {
        Progress progress = progressRepository.findByEnrollmentEnrollmentId(enrollmentId);
        if (progress != null) {
            progress.setProgressPercentage(percentage);
            return progressRepository.save(progress);
        } else {
            return null;
        }
    }
    
    @Transactional
    public Progress createProgress(Progress progress) {
        return progressRepository.save(progress);
    }
}

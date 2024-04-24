package com.example.myapp.service;

import com.example.myapp.model.Enrollment;
import com.example.myapp.repository.EnrollmentRepository;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public void enrollCourse(Enrollment enrollmentDto) {

         Enrollment enrollment = new Enrollment(enrollmentDto.getUserId(), enrollmentDto.getCourseId(), enrollmentDto.getEnrollmentDate());
         enrollmentRepository.save(enrollment);
        
    }

    public boolean isAlreadyEnrolled(Integer userId, Long courseId) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        return existingEnrollment.isPresent();
    }
}

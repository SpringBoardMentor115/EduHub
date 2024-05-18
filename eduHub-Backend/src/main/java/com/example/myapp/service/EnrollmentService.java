package com.example.myapp.service;

import com.example.myapp.model.Enrollment;
import com.example.myapp.model.Enrollment.EnrollmentStatus;
import com.example.myapp.repository.EnrollmentRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public void enrollCourse(Integer userId, Long courseId, Date enrollmentDate, EnrollmentStatus status) {
        Enrollment enrollment = new Enrollment(userId, courseId, enrollmentDate);
        enrollment.setStatus(status);
        enrollmentRepository.save(enrollment);
    }

    public boolean isAlreadyEnrolled(Integer userId, Long courseId) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        return existingEnrollment.isPresent();
    }
 
    public void unsubscribeCourse(Integer userId, Long courseId, EnrollmentStatus status) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        existingEnrollment.ifPresent(enrollment -> {
            enrollment.setStatus(status);
            enrollmentRepository.save(enrollment);
        });
    }
    
    public List<Enrollment> getEnrolledActiveCourses(Integer userId) {
        return enrollmentRepository.findActiveCoursesByUserId(userId);
    }
    
    public EnrollmentStatus getEnrollmentStatus(Integer userId, Long courseId) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        return existingEnrollment.map(Enrollment::getStatus).orElse(null);
    }

    public void reEnrollCourse(Integer userId, Long courseId, Date enrollmentDate, EnrollmentStatus status) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        existingEnrollment.ifPresent(enrollment -> {
            enrollment.setStatus(status);
            enrollment.setEnrollmentDate(enrollmentDate);
            enrollmentRepository.save(enrollment);
        });
    }
}

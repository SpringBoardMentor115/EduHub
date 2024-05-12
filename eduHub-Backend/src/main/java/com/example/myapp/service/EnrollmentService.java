package com.example.myapp.service;

import com.example.myapp.model.Course;
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
    
//    public boolean isAlreadyEnrolledOrUnsubscribed(Integer userId, Long courseId) {
//        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
//        
//        if (existingEnrollment.isPresent()) {
//            // If the enrollment exists, check if its status is ACTIVE or UNSUBSCRIBED
//            Enrollment enrollment = existingEnrollment.get();
//            return enrollment.getStatus() == EnrollmentStatus.ACTIVE;
//        } else {
//            // If the enrollment doesn't exist, user can enroll
//            return false;
//        }
//    }
 
    public void unsubscribeCourse(Integer userId, Long courseId, EnrollmentStatus status) {
        Optional<Enrollment> existingEnrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        existingEnrollment.ifPresent(enrollment -> {
            enrollment.setStatus(status);
            enrollmentRepository.save(enrollment);
        });
    }
    
//    public List<Enrollment> getEnrolledActiveCoursesByUserId(Integer userId) {
//        return enrollmentRepository.findByUserIdAndStatus(userId, EnrollmentStatus.ACTIVE);
//    }
    
    public List<Course> getEnrolledActiveCoursesByUserId(Integer userId) {
        return enrollmentRepository.findActiveCoursesByUserId(userId);
    }

}

package com.example.myapp.controller;

import com.example.myapp.model.Course;
import com.example.myapp.model.Enrollment;
import com.example.myapp.model.Enrollment.EnrollmentStatus;
import com.example.myapp.model.User;
import com.example.myapp.service.EnrollmentService;
import com.example.myapp.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    public EnrollmentController(EnrollmentService enrollmentService, UserService userService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/enroll")
    public ResponseEntity<Map<String, String>> enrollCourse(@RequestBody Enrollment enrollmentDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();       
        Integer userId = user.getId();
        boolean alreadyEnrolled = enrollmentService.isAlreadyEnrolled(userId, enrollmentDto.getCourseId());
        if (alreadyEnrolled) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "User is already enrolled or has unsubscribed from this course"));
        } else {
            enrollmentService.enrollCourse(userId, enrollmentDto.getCourseId(), enrollmentDto.getEnrollmentDate(), EnrollmentStatus.ACTIVE);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Enrolled Successfully"));
        }
    }
    
//    @PostMapping("/enroll")
//    public ResponseEntity<Map<String, String>> enrollCourse(@RequestBody Enrollment enrollmentDto) {
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Integer userId = user.getId();
//
//        // Check if the user is already enrolled or if the enrollment status is UNSUBSCRIBED
//        boolean alreadyEnrolledOrUnsubscribed = enrollmentService.isAlreadyEnrolledOrUnsubscribed(userId, enrollmentDto.getCourseId());
//        if (alreadyEnrolledOrUnsubscribed) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "User is already enrolled or has unsubscribed from this course"));
//        } else {
//            enrollmentService.enrollCourse(userId, enrollmentDto.getCourseId(), enrollmentDto.getEnrollmentDate(), EnrollmentStatus.ACTIVE);
//            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Enrolled Successfully"));
//        }
//    }
    
    @PutMapping("/unsubscribeCourse")
    public ResponseEntity<Map<String, String>> unsubscribeCourse(@RequestBody Enrollment unsubscribeRequest) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();       
        Integer userId = user.getId();
        enrollmentService.unsubscribeCourse(userId, unsubscribeRequest.getCourseId(), EnrollmentStatus.UNSUBSCRIBED);
        return ResponseEntity.ok(Map.of("message", "Unsubscribed successfully"));
    }

//    @GetMapping("/get-enrolled-courses")
//    public ResponseEntity<List<Course>> getEnrolledCoursesByUserId() {
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        Integer userId = user.getId();
//        List<Course> enrolledCourses = enrollmentService.getEnrolledActiveCoursesByUserId(userId);
//        return ResponseEntity.ok(enrolledCourses);
//    }
    
    @GetMapping("/get-enrolled-courses")
    public ResponseEntity<List<Enrollment>> getEnrolledCoursesByUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer userId = user.getId();
        List<Enrollment> enrolledCourses = enrollmentService.getEnrolledActiveCourses(userId);
        return ResponseEntity.ok(enrolledCourses);
    }

    
}

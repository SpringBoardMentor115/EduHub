package com.example.myapp.controller;

import com.example.myapp.model.Enrollment;
import com.example.myapp.service.EnrollmentService;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/enroll")
    public ResponseEntity<Map<String, String>> enrollCourse(@RequestBody Enrollment enrollmentDto) {
        boolean alreadyEnrolled = enrollmentService.isAlreadyEnrolled(enrollmentDto.getUserId(), enrollmentDto.getCourseId());
        
        if (alreadyEnrolled) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "User is already enrolled in this course"));
        } else {
            enrollmentService.enrollCourse(enrollmentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Enrolled Successfully"));
        }
    }
}

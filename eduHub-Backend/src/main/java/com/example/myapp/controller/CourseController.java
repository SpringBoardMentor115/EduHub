package com.example.myapp.controller;

import com.example.myapp.model.Course;

import com.example.myapp.service.CourseService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class CourseController {
   
    private CourseService courseService;
    
    
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<List<Course>> getAllCoursesByCategory(@PathVariable Long categoryId) {
        List<Course> courses = courseService.getAllCoursesByCategory(categoryId);
        return ResponseEntity.ok(courses);
    }
}

package com.example.myapp.service;

import com.example.myapp.model.Course;
import com.example.myapp.repository.CourseRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    
    private final CourseRepository courseRepository;
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCoursesByCategory(Long categoryId) {
        return courseRepository.findByCategoryCategoryId(categoryId);
    }
}

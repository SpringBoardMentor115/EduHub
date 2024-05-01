package com.example.myapp.service;

import com.example.myapp.model.CourseContent;
import com.example.myapp.repository.CourseContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseContentService {

    private final CourseContentRepository repository;

    public CourseContentService(CourseContentRepository repository) {
        this.repository = repository;
    }

    public List<CourseContent> getCourseContentByCourseId(Long courseId) {
        return repository.findByCourseId(courseId);
    }
}

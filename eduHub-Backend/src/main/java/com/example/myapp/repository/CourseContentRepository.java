package com.example.myapp.repository;

import com.example.myapp.model.CourseContent;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseContentRepository extends CrudRepository<CourseContent, Integer> {
    List<CourseContent> findByCourseId(Long courseId);
}

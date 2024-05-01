package com.example.myapp.controller;

import com.example.myapp.model.CourseContent;
import com.example.myapp.service.CourseContentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RequestMapping("/courseContent")
@RestController
public class CourseContentController {

    private final CourseContentService service;

    public CourseContentController(CourseContentService service) {
        this.service = service;
    }

    @GetMapping("/{courseId}")
    public List<CourseContent> getCourseContentByCourseId(@PathVariable Long courseId) {
        return service.getCourseContentByCourseId(courseId);
    }
}

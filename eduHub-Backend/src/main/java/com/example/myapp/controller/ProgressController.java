package com.example.myapp.controller;

import com.example.myapp.model.Progress;
import com.example.myapp.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trackprogress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/{enrollmentId}")
    public ResponseEntity<Progress> getProgressByEnrollmentId(@PathVariable Long enrollmentId) {
        Progress progress = progressService.getProgressByEnrollmentId(enrollmentId);
        if (progress != null) {
            return ResponseEntity.ok(progress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

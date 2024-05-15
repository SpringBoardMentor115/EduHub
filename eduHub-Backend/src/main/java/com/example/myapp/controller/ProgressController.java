package com.example.myapp.controller;

import com.example.myapp.model.Progress;
import com.example.myapp.service.ProgressService;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<Optional<Progress>> getProgressByEnrollmentId(@PathVariable Long enrollmentId) {
        Optional<Progress> progress = Optional.ofNullable(progressService.getProgressByEnrollmentId(enrollmentId));
        if (progress != null) {
            return ResponseEntity.ok(progress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/updatePercentage")
    public ResponseEntity<Map<String, String>> updateProgressPercentage(@RequestBody Progress requestBody) {
        Long enrollmentId = requestBody.getEnrollmentId();
        Integer percentage = requestBody.getProgressPercentage();

        if (enrollmentId == null || percentage == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid request body"));
        }

        Progress updatedProgress = progressService.updateProgressPercentage(enrollmentId, percentage);
        if (updatedProgress != null) {
            return ResponseEntity.ok(Map.of("message", "Updated Percentage successfully"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}

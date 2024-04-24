package com.example.myapp.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.myapp.model.Enrollment;

@Repository
public interface EnrollmentRepository extends CrudRepository<Enrollment, Long> {
	Optional<Enrollment> findByUserIdAndCourseId(Integer userId, Long courseId);
    
}

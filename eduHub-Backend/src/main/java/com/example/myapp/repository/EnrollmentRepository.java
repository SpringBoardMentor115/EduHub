package com.example.myapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.example.myapp.model.Enrollment;

@Repository
public interface EnrollmentRepository extends CrudRepository<Enrollment, Long> {
	Optional<Enrollment> findByUserIdAndCourseId(Integer userId, Long courseId);	
	
	@Query("SELECT e FROM Enrollment e WHERE e.user.id = :userId AND e.status = 'ACTIVE'")
    List<Enrollment> findActiveCoursesByUserId(Integer userId);
}

package com.example.myapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.myapp.model.Course;
import com.example.myapp.model.Enrollment;

@Repository
public interface EnrollmentRepository extends CrudRepository<Enrollment, Long> {
	Optional<Enrollment> findByUserIdAndCourseId(Integer userId, Long courseId);
	
	@Query("SELECT e.course FROM Enrollment e WHERE e.userId = :userId AND e.status = 'ACTIVE'")
    List<Course> findActiveCoursesByUserId(@Param("userId") Integer userId);
}

package com.example.myapp.repository;

import com.example.myapp.model.Progress;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends CrudRepository<Progress, Long> {
	Progress findByEnrollmentEnrollmentId(Long enrollmentId);
}

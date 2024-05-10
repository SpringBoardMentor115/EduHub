package com.example.myapp.repository;


import com.example.myapp.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressRepository extends JpaRepository<Progress, Integer> {
    Progress findByEnrollmentEnrollmentId(long enrollmentId);
}

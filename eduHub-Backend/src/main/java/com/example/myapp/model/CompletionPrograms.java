package com.example.myapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "CompletionPrograms")
public class CompletionPrograms {
    public CompletionPrograms() {}

    @Id
    @Column(name = "ProgressID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;

    @Column(name = "ProgressPercentage")
    private Integer progressPercentage;

    @Column(name = "LastAccessDate")
    private Date lastAccessDate;

    @ManyToOne
    @JoinColumn(name = "EnrollmentID", referencedColumnName = "EnrollmentID", insertable = false, updatable = false)
    private Enrollment enrollment;

    public CompletionPrograms(Integer progressPercentage, Date lastAccessDate) {
        this.progressPercentage = progressPercentage;
        this.lastAccessDate = lastAccessDate;
    }

    // Getters and setters
    
    public Long getProgressId() {
        return progressId;
    }

    public void setProgressId(Long progressId) {
        this.progressId = progressId;
    }

    public Integer getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(Integer progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public Date getLastAccessDate() {
        return lastAccessDate;
    }

    public void setLastAccessDate(Date lastAccessDate) {
        this.lastAccessDate = lastAccessDate;
    }

    public Enrollment getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
    }
}

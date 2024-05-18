package com.example.myapp.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Progress")
public class Progress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProgressID")
    private Integer progressId;

    @Column(name = "ProgressPercentage")
    private Integer progressPercentage;

    @Column(name = "LastAccessedDate")
    private Date lastAccessedDate;

    @OneToOne
    @JoinColumn(name = "EnrollmentId", referencedColumnName = "EnrollmentId", foreignKey = @ForeignKey(name = "FK_Progress_Enrollment"))
    @JsonBackReference
    private Enrollment enrollment;

    public Progress() {
    }

    // Getters and Setters
    public Integer getProgressId() {
        return progressId;
    }

    public void setProgressId(Integer progressId) {
        this.progressId = progressId;
    }

    public Integer getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(Integer progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public Date getLastAccessedDate() {
        return lastAccessedDate;
    }

    public void setLastAccessedDate(Date lastAccessedDate) {
        this.lastAccessedDate = lastAccessedDate;
    }

    public Enrollment getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(Enrollment enrollment) {
        this.enrollment = enrollment;
    }

    public Long getEnrollmentId() {
        return enrollment != null ? enrollment.getEnrollmentId() : null;
    }

    public void setEnrollmentId(Long enrollmentId) {
        if (this.enrollment == null) {
            this.enrollment = new Enrollment();
        }
        this.enrollment.setEnrollmentId(enrollmentId);
    }
}

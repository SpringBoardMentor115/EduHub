package com.example.myapp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;

@Entity

@Table(name = "Enrollments")
public class Enrollment {
	public Enrollment(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EnrollmentId")
    private Long enrollmentId;

    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "CourseID")
    private Long courseId;

    @Column(name = "EnrollmentDate")
    private Date enrollmentDate;
    
    public enum EnrollmentStatus {
        ACTIVE,
        UNSUBSCRIBED
    }
    
    @Column(name = "EnrollmentStatus")
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    @ManyToOne
    @JoinColumn(name = "UserID", referencedColumnName = "UserID", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "FK_Enrollment_User"))
    private User user;

    @ManyToOne
    @JoinColumn(name = "CourseID", referencedColumnName = "CourseID", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "FK_Enrollment_Course"))
    private Course course;

    public Enrollment(Integer userId, Long courseId, Date enrollmentDate) {
        this.userId = userId;
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
    }

    // Getters and setters
    
    public Long getEnrollmentId() {
        return enrollmentId;
    }

    public void setEnrollmentId(Long enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Date getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(Date enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    
    public EnrollmentStatus getStatus() {
        return status;
    }

    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }
}

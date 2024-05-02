package com.example.myapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "coursecontent")
public class CourseContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ContentID")
    private int contentID;

    @Column(name = "CourseID")
    private Long courseId;

    @Column(name = "ContentTitle")
    private String contentTitle;

    @Column(name = "ContentDescription")
    private String contentDescription;

    @Column(name = "ContentURl")
    private String contentURl;

    @ManyToOne
    @JoinColumn(name = "CourseID", nullable = false, referencedColumnName = "CourseID", insertable = false, updatable = false)
    @JsonBackReference
    private Course course;


    public CourseContent() {
        // default constructor
    }

    public CourseContent(Long courseId, String contentTitle, String contentDescription, String  contentURl){
        this.courseId = courseId;
        this.contentTitle = contentTitle;
        this.contentDescription = contentDescription;
        this.contentURl = contentURl;
    }

    // getters
    public int getContentID() {
        return contentID;
    }

    public Long getCourseId() {
        return courseId;
    }

    public String getContentTitle() {
        return contentTitle;
    }

    public String getContentDescription() {
        return contentDescription;
    }

    public String getContentURL() {
        return contentURl;
    }

    public Course getCourse() {
        return course;
    }

    // setters
    public void setContentID(int contentID) {
        this.contentID = contentID;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public void setContentTitle(String contentTitle) {
        this.contentTitle = contentTitle;
    }

    public void setContentDescription(String contentDescription) {
        this.contentDescription = contentDescription;
    }

    public void setContentURL(String contentURL) {
        this.contentURl = contentURL;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}

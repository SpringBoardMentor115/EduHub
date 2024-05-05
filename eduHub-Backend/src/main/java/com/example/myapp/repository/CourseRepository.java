package com.example.myapp.repository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.myapp.model.Course;
import java.util.List;


@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {
	List<Course>  findByCategoryCategoryId(Long categoryID);
	//List<Course>  findByCategoryCategoryName(String category_name);
    
}
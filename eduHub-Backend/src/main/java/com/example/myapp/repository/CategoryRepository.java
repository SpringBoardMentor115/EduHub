package com.example.myapp.repository;

import com.example.myapp.model.Category;

import org.springframework.data.repository.CrudRepository; // Change import statement
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> { // Change interface
    Category findByCategoryId(Integer categoryId);
}

package com.example.myapp.controller;
import com.example.myapp.model.Category;
import com.example.myapp.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/auth")
@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController( CategoryService categoryService) {
        
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<Category> categories = categoryService.getAllCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        
        List<String> categoryStrings = categories.stream()
    .map(category -> String.format("%d, %s", category.getCategoryId(), category.getCategoryName().trim()))
    .toList();

return ResponseEntity.ok(categoryStrings);


    
    }
}

package com.github.danrog303.poptracker.domain.category;

import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class SubcategoryController {
    private final SubcategoryService subcategoryService;

    @PostMapping("/subcategories")
    public Subcategory createCategory(@RequestBody Subcategory subcategory) {
        return subcategoryService.createCategory(subcategory);
    }

    @GetMapping("/subcategories")
    public List<Subcategory> getAllCategoriesOfUser() {
        return subcategoryService.getAllCategoriesOfUser();
    }

    @GetMapping("/subcategories/{subcategoryId}")
    public Subcategory getSubcategoryById(@PathVariable String subcategoryId) {
        return subcategoryService.getCategoryById(subcategoryId);
    }

    @DeleteMapping("/subcategories/{subcategoryId}")
    public Subcategory deleteCategory(@PathVariable String subcategoryId) {
        return subcategoryService.deleteCategory(subcategoryId);
    }

    @PutMapping("/subcategories/{subcategoryId}")
    public Subcategory updateCategory(@PathVariable String subcategoryId,
                                      @RequestBody Subcategory subcategory) {
        return subcategoryService.modifyCategory(subcategoryId, subcategory);
    }
}

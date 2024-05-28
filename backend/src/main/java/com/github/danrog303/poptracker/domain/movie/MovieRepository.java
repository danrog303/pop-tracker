package com.github.danrog303.poptracker.domain.movie;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, String> {
    List<Movie> findAllBySubcategorySubcategoryId(String subcategoryId);
    void deleteBySubcategory(Subcategory sc);
}

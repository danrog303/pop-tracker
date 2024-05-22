package com.github.danrog303.poptracker.domain.movie;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, String> {
    List<Movie> findAllBySubcategorySubcategoryId(String subcategoryId);
}

package com.github.danrog303.poptracker.domain.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubcategoryRepository extends JpaRepository<Subcategory, String> {
    public List<Subcategory> findByOwnerUserId(String id);
}

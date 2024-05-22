package com.github.danrog303.poptracker.domain.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {
    List<Book> findAllBySubcategorySubcategoryId(String subcategoryId);
}

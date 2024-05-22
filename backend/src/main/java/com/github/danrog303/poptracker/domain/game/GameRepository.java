package com.github.danrog303.poptracker.domain.game;

import com.github.danrog303.poptracker.domain.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, String> {
    List<Game> findAllBySubcategorySubcategoryId(String subcategoryId);
}
